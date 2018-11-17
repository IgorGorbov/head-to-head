import { observable, action, computed } from 'mobx';
import { uniq } from 'lodash';
import { firebaseAuth, playersRef, headToHeadsRef, gamesRef } from '../utils/firebase';

class ViewStore implements IViewStore {
  @observable authed = false;
  @observable isLoading = true;
  @observable user = null;
  @observable errorMessage = '';
  @observable players = [];
  @observable headToHeads = [];
  @observable selectedHeadToHead = null;
  @observable games = [];

  @action
  fetchData = () => {
    this.errorMessage = '';
    this.fetchPlayers();
    this.fetchHeadToHeads();
  };

  @action
  getPlayerName = (key: string) => {
    const player = this.players.length && this.players.filter(player => player.key === key);
    return player[0].name;
  };

  @action
  fetchPlayers = () => {
    playersRef.on(
      'value',
      function(snapshot) {
        let players = [];

        snapshot.forEach(function(childSnapshot) {
          const player = childSnapshot.val();
          player.key = childSnapshot.key;
          players.push(player);
        });

        this.players = players;
      }.bind(this)
    );
  };

  @action
  fetchHeadToHeads = () => {
    headToHeadsRef.on(
      'value',
      function(snapshot) {
        let headToHeads = [];

        snapshot.forEach(function(childSnapshot) {
          const headToHead = childSnapshot.val();
          headToHead.key = childSnapshot.key;
          headToHeads.push(headToHead);
        });

        this.headToHeads = headToHeads;

        this.headToHeads.length > 0 &&
          this.selectedHeadToHead === null &&
          this.selectHeadToHead(this.headToHeads[0]);
      }.bind(this)
    );
  };

  @action
  fetchHeadToHead = (key: string) => {
    this.fetchPlayers();

    headToHeadsRef.child(key).on(
      'value',
      function(snapshot) {
        if (!!snapshot.val()) {
          const headToHead = snapshot.val();
          headToHead.key = snapshot.key;

          this.selectHeadToHead(headToHead);
        } else {
          this.errorMessage = "This Head To Head doesn't exist.";
        }
      }.bind(this)
    );
  };

  @computed
  get headToHeadPlayers() {
    let keys = [];

    this.headToHeads &&
      this.headToHeads.length &&
      this.headToHeads.map(headToHead => keys.push(headToHead.playerA, headToHead.playerB));

    return uniq(keys);
  }

  @action
  updatePlayer = (key: string, name: string) => {
    playersRef.child(key).update({ name: name });
  };

  @action
  deletePlayer = (key: string) => {
    playersRef.child(key).remove();
  };

  @action
  deleteAllPlayers = () => {
    playersRef.remove();
  };

  @action
  firebaseCheckAuth = () => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.authed = true;
        this.isLoading = false;
        this.user = user;
      } else {
        this.authed = false;
        this.isLoading = false;
        this.user = null;
      }
    });
  };

  @action
  loadError = err => {
    this.errorMessage = err;
  };

  @action
  addPlayer = (playerName: string) => {
    const playerKey = playersRef.push().key;
    playersRef.child(playerKey).set({ name: playerName });
  };

  @action
  addHeadToHead = (headToHeadName: string, playerA: string, playerB: string) => {
    const headToHeadKey = headToHeadsRef.push().key;
    headToHeadsRef.child(headToHeadKey).set({
      headToHeadName,
      playerA,
      playerB,
      playerAWinCount: 0,
      playerBWinCount: 0,
      drawsCount: 0,
    });
  };

  @action
  updateHeadToHead = (key: string, name: string, value: string) => {
    headToHeadsRef.child(key).update({ [name]: value });
  };

  @action
  deleteHeadToHead = (key: string) => {
    this.deleteAllHeadToHeadGames(key);
    headToHeadsRef.child(key).remove();
  };

  @action
  deleteAllHeadToHeadGames = (key: string) => {
    const query = gamesRef.orderByChild('headToHeadKey').equalTo(key);
    query.on('child_added', function(snapshot) {
      snapshot.ref.remove();
    });
  };

  @action
  selectHeadToHead = (headToHead: HeadToHead) => {
    this.selectedHeadToHead = headToHead;
    this.fetchGames(headToHead);
  };

  @action
  addGame = (
    homeTeamName: string,
    awayTeamName: string,
    homeTeamGoals: number,
    awayTeamGoals: number
  ) => {
    const gameKey = gamesRef.push().key;
    const { key, playerA, playerB } = this.selectedHeadToHead;

    const winnerKey = this.getWinner(playerA, playerB, homeTeamGoals, awayTeamGoals);

    const pA = this.players.length && this.players.filter(player => player.key === playerA);
    const pB = this.players.length && this.players.filter(player => player.key === playerB);

    this.updateTotalScore(winnerKey, 'addGame');

    gamesRef.child(gameKey).set({
      headToHeadKey: key,
      homeTeamKey: playerA,
      awayTeamKey: playerB,
      homeTeamName: homeTeamName !== '' ? homeTeamName : pA[0].name,
      awayTeamName: awayTeamName !== '' ? awayTeamName : pB[0].name,
      homeTeamGoals,
      awayTeamGoals,
      date: Date.now(),
      winnerKey,
    });
  };

  getWinner = (playerA: string, playerB: string, homeTeamGoals: number, awayTeamGoals: number) => {
    let winner = '';
    if (homeTeamGoals > awayTeamGoals) {
      winner = playerA;
    } else if (homeTeamGoals < awayTeamGoals) {
      winner = playerB;
    } else if (homeTeamGoals === awayTeamGoals) {
      winner = 'draw';
    }
    return winner;
  };

  @action
  updateTotalScore = (winnerKey: string, action: string) => {
    const {
      key,
      playerAWinCount,
      drawsCount,
      playerBWinCount,
      playerA,
      playerB,
    } = this.selectedHeadToHead;

    switch (action) {
      case 'addGame':
        if (winnerKey === playerA) {
          headToHeadsRef.child(key).update(
            { playerAWinCount: playerAWinCount + 1 },
            function() {
              this.selectedHeadToHead.playerAWinCount = playerAWinCount + 1;
            }.bind(this)
          );
        } else if (winnerKey === playerB) {
          headToHeadsRef.child(key).update(
            { playerBWinCount: playerBWinCount + 1 },
            function() {
              this.selectedHeadToHead.playerBWinCount = playerBWinCount + 1;
            }.bind(this)
          );
        } else if (winnerKey === '') {
          headToHeadsRef.child(key).update(
            { drawsCount: drawsCount + 1 },
            function() {
              this.selectedHeadToHead.drawsCount = drawsCount + 1;
            }.bind(this)
          );
        }
        break;

      case 'deleteGame':
        if (winnerKey === playerA) {
          headToHeadsRef.child(key).update(
            { playerAWinCount: playerAWinCount - 1 },
            function() {
              this.selectedHeadToHead.playerAWinCount = playerAWinCount - 1;
            }.bind(this)
          );
        } else if (winnerKey === playerB) {
          headToHeadsRef.child(key).update(
            { playerBWinCount: playerBWinCount - 1 },
            function() {
              this.selectedHeadToHead.playerBWinCount = playerBWinCount - 1;
            }.bind(this)
          );
        } else if (winnerKey === '') {
          headToHeadsRef.child(key).update(
            { drawsCount: drawsCount - 1 },
            function() {
              this.selectedHeadToHead.drawsCount = drawsCount - 1;
            }.bind(this)
          );
        }
        break;
      default:
        break;
    }
  };

  @action
  fetchGames = (headToHead: HeadToHead, fetchAll?: boolean) => {
    const limit = fetchAll ? 100 : 5;
    gamesRef
      .orderByChild('headToHeadKey')
      .equalTo(headToHead.key)
      .limitToLast(limit)
      .on(
        'value',
        function(snapshot) {
          let games = [];

          snapshot.forEach(function(childSnapshot) {
            const game = childSnapshot.val();
            game.key = childSnapshot.key;
            games.push(game);
          });

          this.games = games;

          this.headToHeads.length > 0 &&
            this.selectedHeadToHead === null &&
            this.selectHeadToHead(this.headToHeads[0]);
        }.bind(this)
      );
  };

  @action
  updateGame = (key: string, field: string, value: string | number) => {
    gamesRef.child(key).update({ [field]: value });
  };

  @action
  deleteGame = (key: string) => {
    const game = this.games.filter(game => game.key === key);
    this.updateTotalScore(game[0].winnerKey, 'deleteGame');
    gamesRef.child(key).remove();
  };
}

export default ViewStore;

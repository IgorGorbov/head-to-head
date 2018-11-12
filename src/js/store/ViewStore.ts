import { observable } from 'mobx';
import { firebaseAuth, playersRef } from '../utils/firebase';

class ViewStore implements IViewStore {
  @observable authed = false;
  @observable isLoading = true;
  @observable user = null;
  @observable errorMessage = '';
  @observable players = [];

  constructor() {
    this.fetchPlayers();
  }

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

  updatePlayer = (key: string, name: string) => {
    playersRef.child(key).set({ name: name });
  };

  deletePlayer = (key: string) => {
    playersRef.child(key).remove();
  };

  deleteAllPlayers = () => {
    playersRef.remove();
  };


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

  loadError = err => {
    this.errorMessage = err;
  };

  addPlayer = (playerName: string) => {
    const playerKey = playersRef.push().key;
    playersRef.child(playerKey).set({ name: playerName });
  };
}

export default ViewStore;

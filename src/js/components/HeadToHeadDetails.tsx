import * as React from 'react';
import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { History } from 'history';

import PlayerIcon from './PlayerIcon';
import Games from './Games';
import { AddGameForm } from './admin/forms';

interface HeadToHeadDetailsProps {
  viewStore?: IViewStore;
  headToHead: HeadToHead;
  history: History;
  match?: any;
}

interface HeadToHeadDetailsState {
  showAll: boolean;
}

@inject('viewStore')
@observer
class HeadToHeadDetails extends React.Component<HeadToHeadDetailsProps, HeadToHeadDetailsState> {
  state = {
    showAll: false,
  };

  componentDidMount() {
    const { viewStore, history, match } = this.props;
    const { location } = history;
    const { selectedHeadToHead, authed } = viewStore;
    const isAll = location.pathname === '/all';

    if (selectedHeadToHead === null && !isAll) {
      viewStore.fetchHeadToHead(match.params.id);
    }

    authed && viewStore.fetchHeadToHeads();
  }

  handleShowAll = () => {
    const { viewStore } = this.props;
    const { selectedHeadToHead } = viewStore;

    viewStore.fetchGames(selectedHeadToHead, true);

    this.setState({
      showAll: true,
    });
  };

  render() {
    const { showAll } = this.state;
    const { history, headToHead, viewStore } = this.props;
    const { selectedHeadToHead, getPlayerName, games, errorMessage, authed } = viewStore;
    const { location } = history;
    const isAll = location.pathname === '/all';
    const goToDetail = () => {
      viewStore.selectHeadToHead(headToHead);
    };

    const { playerA, playerB, playerAWinCount, playerBWinCount, drawsCount } =
      headToHead || (!!selectedHeadToHead && selectedHeadToHead);

    const blockClass = classNames({
      'hth-block__item ': true,
      'is-winning home-team': playerAWinCount > playerBWinCount,
      'is-winning away-team': playerAWinCount < playerBWinCount,
    });
    return (
      <div className="row">
        <div className="col-sm-8">
          {selectedHeadToHead && (
            <div
              className={`hth-block ${!isAll ? 'with-details' : ''}`}
              onClick={() => {
                isAll && goToDetail();
                history.push(`/details/${selectedHeadToHead.key}`);
              }}
            >
              <div className={blockClass}>
                <span className="hth-block__item__title center-teams">
                  <span className="center-teams__home">
                    <span>
                      <PlayerIcon /> {getPlayerName(playerA)}
                    </span>
                  </span>
                  <span className="center-teams__center">vs</span>
                  <span className="center-teams__away">
                    <span>
                      {getPlayerName(playerB)} <PlayerIcon />
                    </span>
                  </span>
                </span>

                <span className="hth-block__item__body">
                  <span className="hth-block__item__label">
                    <em>All times score</em>
                  </span>

                  <span className="center-teams">
                    <span className="center-teams__home">{playerAWinCount}</span>
                    <span className="center-teams__center">- {drawsCount} -</span>
                    <span className="center-teams__away">{playerBWinCount}</span>
                  </span>

                  <span className="hth-block__details">
                    <span className="hth-block__item__label is-large">Fifa Challenge</span>
                    {games.length ? (
                      <Games />
                    ) : (
                      <span className="hth-block__item__label">
                        <em>No games found.</em>
                      </span>
                    )}
                  </span>
                </span>

                {!showAll && games.length > 0 && games.length < 11 && (
                  <button
                    onClick={this.handleShowAll}
                    type="button"
                    className="btn btn-default btn-lg btn-block btn-show-all"
                  >
                    Show All
                  </button>
                )}
              </div>
            </div>
          )}

          {errorMessage !== '' && (
            <div id="login-alert" className="alert alert-danger">
              {errorMessage}
            </div>
          )}
        </div>
        <div className="col-sm-4">{authed && !isAll && <AddGameForm />}</div>
      </div>
    );
  }
}

export default HeadToHeadDetails;

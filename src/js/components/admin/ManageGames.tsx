import * as React from 'react';
import { AddGameForm, GameRow } from './forms';
import { inject, observer } from 'mobx-react';

interface ManageGamesProps {
  viewStore?: IViewStore;
}

const ManageGames = (props: ManageGamesProps) => {
  const { viewStore } = props;
  const { games } = viewStore;

  return (
    <div className="row">
      <h2>Manage Games</h2>
      <AddGameForm />
      {games.length ? (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Games</h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Home Team</th>
                    <th>Away Team</th>
                    <th />
                    <th />
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {games.length
                    ? games.reverse().map((game, index) => (
                        <GameRow key={game.key} game={game} index={index} />
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <tr>
          <td colSpan={6}>
            <p>Create your first game above.</p>
          </td>
        </tr>
      )}
    </div>
  );
};

export default inject('viewStore')(observer(ManageGames));

import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface GameRowProps {
  index: number;
  game: Game;
  viewStore?: IViewStore;
}

interface GameRowState {}

@inject('viewStore')
@observer
class GameRow extends React.Component<GameRowProps, GameRowState> {
  handleInputChange = e => {
    const { game, viewStore } = this.props;
    const { name, value }: { name: string; value: string } = e.target;
    viewStore.updateGame(game.key, name, value);
  };

  handleDeleteGame = (key: string) => {
    const { viewStore } = this.props;
    viewStore.deleteGame(key);
  };
  render() {
    const { index, game } = this.props;
    const { homeTeamName, awayTeamName, homeTeamGoals, awayTeamGoals } = game;
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <input
            type="text"
            className="form-control"
            id={`homeTeamName`}
            name="homeTeamName"
            placeholder="Home team name"
            value={homeTeamName}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            id={`awayTeamName`}
            name="awayTeamName"
            placeholder="Away team name"
            value={awayTeamName}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            id={`homeTeamGoals`}
            name="homeTeamGoals"
            placeholder="Home team score"
            value={homeTeamGoals}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            id={`awayTeamGoals`}
            name="awayTeamGoals"
            placeholder="Away team score"
            value={awayTeamGoals}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <button onClick={() => this.handleDeleteGame(game.key)} className="btn btn-default">
            X
          </button>
        </td>
      </tr>
    );
  }
}

export default GameRow;

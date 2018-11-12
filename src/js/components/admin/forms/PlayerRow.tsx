import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface PlayerRowProps {
  player: Player;
  index: number;
  viewStore?: IViewStore;
}
interface PlayerRowState {}

@inject('viewStore')
@observer
class PlayerRow extends React.Component<PlayerRowProps, PlayerRowState> {
  handleInputChange = e => {
    const { player, viewStore } = this.props;
    const { value }: { value: string } = e.target;

    if (value && value.trim().length) {
      viewStore.updatePlayer(player.key, value);
    }
  };

  handleDeletePlayer = (key: string) => {
    const { viewStore } = this.props;
    viewStore.deletePlayer(key);
  };

  handleDeleteAllPlayers = () => {
    const { viewStore } = this.props;
    viewStore.deleteAllPlayers();
  };

  render() {
    const { index, player } = this.props;
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <input
            type="text"
            className="form-control"
            id="playerName"
            name="name"
            placeholder="Player Name"
            value={player.name}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <button onClick={() => this.handleDeletePlayer(player.key)} className={`btn btn-default`}>
            X
          </button>
          <button onClick={this.handleDeleteAllPlayers} className={`btn btn-default`}>
            Delete all players
          </button>
        </td>
      </tr>
    );
  }
}

export default PlayerRow;

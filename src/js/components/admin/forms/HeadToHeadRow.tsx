import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface HeadToHeadRowProps {
  index: number;
  headToHead: HeadToHead;
  viewStore?: IViewStore;
}

interface HeadToHeadRowState {}

@inject('viewStore')
@observer
class HeadToHeadRow extends React.Component<HeadToHeadRowProps, HeadToHeadRowState> {
  handleInputChange = e => {
    const { headToHead, viewStore } = this.props;
    const { name, value }: { name: string; value: string } = e.target;

    viewStore.updateHeadToHead(headToHead.key, name, value);
  };

  handleDeleteHeadToHead = (key: string) => {
    const { viewStore } = this.props;
    viewStore.deleteHeadToHead(key);
  };

  render() {
    const { index, headToHead, viewStore } = this.props;
    const { players } = viewStore;
    const { headToHeadName, playerA, playerB } = headToHead;

    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <input
            type="text"
            className="form-control"
            id={`title`}
            name="headToHeadName"
            placeholder="Head To Head Title"
            value={headToHeadName}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <div className="form-group">
            <select
              className="form-control"
              id="playerA"
              name="playerA"
              value={playerA}
              onChange={this.handleInputChange}
            >
              {players.length &&
                players.map(player => {
                  const { key, name } = player;
                  return (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  );
                })}
            </select>
          </div>
        </td>
        <td>
          <div className="form-group">
            <select
              className="form-control"
              id="playerB"
              name="playerB"
              value={playerB}
              onChange={this.handleInputChange}
            >
              {players.length &&
                players.map(player => {
                  const { key, name } = player;
                  return (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  );
                })}
            </select>
          </div>
        </td>
        <td>
          <button
            onClick={() => this.handleDeleteHeadToHead(headToHead.key)}
            className="btn btn-default"
          >
            X
          </button>
        </td>
      </tr>
    );
  }
}

export default HeadToHeadRow;

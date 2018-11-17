import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface AddHeadToHeadFormProps {
  viewStore?: IViewStore;
}

interface AddHeadToHeadFormState {
  headToHeadName: string;
  playerA: string;
  playerB: string;
}

@inject('viewStore')
@observer
class AddHeadToHeadForm extends React.Component<AddHeadToHeadFormProps, AddHeadToHeadFormState> {
  state = {
    headToHeadName: '',
    playerA: '',
    playerB: '',
  };

  updateState = (key: string, value: string) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    this.updateState(name, value);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { headToHeadName, playerA, playerB } = this.state;
    const { viewStore } = this.props;

    viewStore.addHeadToHead(headToHeadName, playerA, playerB);

    if (
      headToHeadName &&
      headToHeadName.trim().length &&
      playerA &&
      playerA.trim().length &&
      playerB &&
      playerB.trim().length
    ) {
      this.setState({
        headToHeadName: '',
        playerA: '',
        playerB: '',
      });
    }
  };

  render() {
    const { headToHeadName, playerA, playerB } = this.state;
    const { viewStore } = this.props;
    const { players } = viewStore;
    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">Add new Head To Head</h3>
        </div>
        <div className="panel-body">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <div className="form-group">
                  <label htmlFor="headToHeadName">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="headToHeadName"
                    name="headToHeadName"
                    placeholder="VS Your Mate"
                    onChange={this.handleInputChange}
                    value={headToHeadName}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="playerA">Your Name</label>
                  <select
                    className="form-control"
                    id="playerA"
                    name="playerA"
                    onChange={this.handleInputChange}
                    value={playerA}
                  >
                    <option value="">Select a player</option>
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
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="playerB">Your Friend</label>
                  <select
                    className="form-control"
                    id="playerB"
                    name="playerB"
                    onChange={this.handleInputChange}
                    value={playerB}
                  >
                    <option value="">Select a player</option>
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
              </div>
              <div className="col-sm-12">
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddHeadToHeadForm;

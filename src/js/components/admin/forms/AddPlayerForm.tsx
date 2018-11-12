import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface AddPlayerFormProps {
  viewStore?: IViewStore;
}

interface AddPlayerFormState {
  [playerName: string]: string;
}

@inject('viewStore')
@observer
class AddPlayerForm extends React.Component<AddPlayerFormProps, AddPlayerFormState> {
  state = {
    playerName: '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { playerName } = this.state;
    const { viewStore } = this.props;

    viewStore.addPlayer(playerName);

    if (playerName && playerName.trim().length) {
      this.setState({
        playerName: '',
      });
    }
  };

  render() {
    const { playerName } = this.state;
    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">Add new player</h3>
        </div>
        <div className="panel-body">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <div className="form-group">
                  <label htmlFor="playerName">Player Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="playerName"
                    name="playerName"
                    placeholder="Player name"
                    value={playerName}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-12">
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

export default AddPlayerForm;

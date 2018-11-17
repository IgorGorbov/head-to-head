import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface AddGameFormProps {
  viewStore?: IViewStore;
}

interface AddGameFormState {
  headToHeadKey: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

@inject('viewStore')
@observer
class AddGameForm extends React.Component<AddGameFormProps, AddGameFormState> {
  state = {
    headToHeadKey: '',
    homeTeamName: '',
    awayTeamName: '',
    homeTeamGoals: 0,
    awayTeamGoals: 0,
  };

  updateState = (key: string, value: string) => {
    const { viewStore } = this.props;
    const selectedHeadToHead =
      viewStore.headToHeads.length &&
      viewStore.headToHeads.filter(headToHead => headToHead.key === value);

    if (key === 'headToHeadKey') {
      viewStore.selectHeadToHead(selectedHeadToHead[0]);
    }
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

    const { homeTeamName, awayTeamName, homeTeamGoals, awayTeamGoals } = this.state;
    const { viewStore } = this.props;

    viewStore.addGame(homeTeamName, awayTeamName, homeTeamGoals, awayTeamGoals);

    this.setState({
      headToHeadKey: '',
      homeTeamName: '',
      awayTeamName: '',
      homeTeamGoals: 0,
      awayTeamGoals: 0,
    });
  };

  render() {
    const { viewStore } = this.props;
    const { headToHeads } = viewStore;
    const { headToHeadKey, homeTeamName, awayTeamName, homeTeamGoals, awayTeamGoals } = this.state;

    return (
      <div className={`form-add-game`}>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Add new Game</h3>
          </div>
          <div className="panel-body">
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="headToHead">Head To Head</label>
                    <select
                      className="form-control"
                      id="headToHeadKey"
                      name="headToHeadKey"
                      value={headToHeadKey}
                      onChange={this.handleInputChange}
                    >
                      {headToHeads.length &&
                        headToHeads.map(headToHead => {
                          const { key, headToHeadName } = headToHead;
                          return (
                            <option key={key} value={key}>
                              {headToHeadName}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="homeTeamName">{`Home Team`}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="homeTeamName"
                      name="homeTeamName"
                      placeholder="Arsenal"
                      value={homeTeamName}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="awayTeamName">{`Away Team`}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="awayTeamName"
                      name="awayTeamName"
                      placeholder="Real Madrid"
                      value={awayTeamName}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12">
                  <h4>Final Score</h4>
                </div>
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group">
                        <label htmlFor="homeTeamGoals">{`Home Team`}</label>
                        <input
                          type="number"
                          className="form-control"
                          id="homeTeamGoals"
                          name="homeTeamGoals"
                          placeholder="0"
                          value={homeTeamGoals}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group">
                        <label htmlFor="awayTeamGoals">{`Away Team`}</label>
                        <input
                          type="number"
                          className="form-control"
                          id="awayTeamGoals"
                          name="awayTeamGoals"
                          placeholder="0"
                          value={awayTeamGoals}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
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
      </div>
    );
  }
}

export default AddGameForm;

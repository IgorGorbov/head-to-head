import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ManageGames, ManageHeadToHeads, ManagePlayers } from './';

interface AdminProps {
  viewStore?: IViewStore;
}

@inject('viewStore')
@observer
class Admin extends React.Component<AdminProps, any> {
  componentDidMount() {
    const { viewStore } = this.props;
    viewStore.fetchData();
  }

  render() {
    const { viewStore } = this.props;
    const { players, headToHeads } = viewStore;
    return (
      <div className="col-sm-8">
        <ManagePlayers />
        {players.length > 1 && <ManageHeadToHeads />}
        {headToHeads.length && <ManageGames />}
      </div>
    );
  }
}

export default Admin;

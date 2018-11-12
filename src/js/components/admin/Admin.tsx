import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ManageGames, ManageHeadToHeads, ManagePlayers } from './';

interface AdminProps {
  viewStore?: IViewStore;
}

@inject('viewStore')
@observer
class Admin extends React.Component<AdminProps, any> {
  render() {
    const { viewStore } = this.props;
    const { players } = viewStore;
    return (
      <div className="col-sm-8">
        {players.length > 1 && <ManagePlayers />}

        <ManageHeadToHeads />
        <ManageGames />
      </div>
    );
  }
}

export default Admin;

import * as React from 'react';
import { Link } from 'react-router-dom';
import HeadToHeadDetails from './HeadToHeadDetails';
import { inject, observer } from 'mobx-react';
import { History } from 'history';

interface AllProps {
  viewStore?: IViewStore;
  history: History;
}

interface AllState {}

@inject('viewStore')
@observer
class All extends React.Component<AllProps, AllState> {
  componentDidMount() {
    const { viewStore } = this.props;
    viewStore.fetchData();
  }
  render() {
    const { viewStore, history } = this.props;
    const { headToHeads } = viewStore;
    return (
      <div>
        {headToHeads.length ? (
          headToHeads.map(headToHead => {
            const { key } = headToHead;
            return <HeadToHeadDetails key={key} headToHead={headToHead} history={history} />;
          })
        ) : (
          <div className="panel panel-info">
            <div className="panel-heading">No Head To Heads found</div>
            <div className="panel-body">
              Create at least two <Link to="/admin">Players</Link> and one{' '}
              <Link to="/admin">Head To Head</Link>.
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default All;

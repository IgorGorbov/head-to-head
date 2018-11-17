import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { AddHeadToHeadForm, HeadToHeadRow } from './forms';

interface ManageHeadToHeadsProps {
  viewStore?: IViewStore;
}

const ManageHeadToHeads = (props: ManageHeadToHeadsProps) => {
  const { viewStore } = props;
  const { headToHeads } = viewStore;
  return (
    <div className="row">
      <h2>Manage Head To Heads</h2>
      <AddHeadToHeadForm />
      {headToHeads.length ? (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Head To Heads</h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Player A</th>
                    <th>Player B</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {headToHeads.length ? (
                    headToHeads.map((headToHead, index) => (
                      <HeadToHeadRow key={headToHead.key} headToHead={headToHead} index={index} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        <p>Create your first head to head above.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default inject('viewStore')(observer(ManageHeadToHeads));

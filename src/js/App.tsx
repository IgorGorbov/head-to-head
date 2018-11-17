import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { All, NavBar, Home, Login, Loader, HeadToHeadDetails } from './components';
import { RequireAuth } from './components/routes';
import Admin from './components/admin/Admin';

import DevTools from 'mobx-react-devtools';

interface AppProps {
  viewStore: IViewStore;
}
interface AppState {}

@inject('viewStore')
@observer
class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { viewStore } = this.props;
    viewStore.firebaseCheckAuth();
  }

  render() {
    const { viewStore } = this.props;
    const { isLoading } = viewStore;
    return (
      <div className={`${isLoading ? 'is-loading' : ''}`}>
        <DevTools />

        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <NavBar  />
            <div className="container-fluid">
              <div className="row">
                <div className="container main-content">
                  <div className="row">
                    <div className="col-sm-12">
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/admin" component={RequireAuth(Admin)} />
                        <Route exact path="/all" component={RequireAuth(All)} />
                        <Route
                          exact
                          path="/login"
                          render={routeProps => <Login {...routeProps} viewStore={viewStore} />}
                        />
                        <Route exact path="/details/:id" component={HeadToHeadDetails} />
                        <Route exact path="/" component={Home} />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);

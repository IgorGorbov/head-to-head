import * as React from 'react';
import { inject } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import All from './components/All';
import Admin from './components/admin/Admin';
import Loader from './components/Loader';

import DevTools from 'mobx-react-devtools';

interface AppProps {
  viewStore: IViewStore;
}
interface AppState {}

@inject('viewStore')
class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
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
            <NavBar />
            <div className="container-fluid">
              <div className="row">
                <div className="container main-content">
                  <div className="row">
                    <div className="col-sm-12">
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/all" component={All} />
                        <Route
                          exact
                          path="/login"
                          render={routeProps => (
                            <Login {...routeProps} viewStore={viewStore} />
                          )}
                        />
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

export default App;

import * as React from 'react';
import { observer } from 'mobx-react';
import { login } from '../utils/firebase';
import { History } from 'history';

interface LoginProps {
  viewStore: IViewStore;
  history: History;
}

@observer
class Login extends React.Component<LoginProps, any> {
  email: HTMLInputElement;
  password: HTMLInputElement;

  handleSubmit = e => {
    e.preventDefault();

    const { viewStore } = this.props;
    login(this.email.value, this.password.value)
      .then(() => {
        this.props.history.push('/all');
        viewStore.firebaseCheckAuth();
      })
      .catch(err => {
        viewStore.loadError(err.message);
      });
  };

  render() {
    const { viewStore } = this.props;
    const { errorMessage } = viewStore;
    return (
      <div id="login-form" className="panel panel-info">
        <div className="panel-heading">
          <div className="panel-title">Sign In</div>
        </div>

        <div className="panel-body">
          <form
            id="loginform"
            className="form"
            role="form"
            onSubmit={this.handleSubmit}
          >
            {errorMessage && (
              <div className="col-sm-12">
                <div className="row form-group">
                  <div id="login-alert" className="alert alert-danger">
                    {errorMessage}
                  </div>
                </div>
              </div>
            )}

            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  ref={el => (this.email = el)}
                />
              </div>
            </div>

            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="pw">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="pw"
                  placeholder="Password"
                  ref={el => (this.password = el)}
                />
              </div>
            </div>

            <div className="col-sm-12">
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

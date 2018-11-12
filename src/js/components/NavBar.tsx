import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/firebase';

interface NavBarProps {
  viewStore: IViewStore;
}

const NavBar = observer(({ viewStore }: NavBarProps) => {
  const { authed } = viewStore;
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>

          <Link to="/" className="navbar-brand">
            Head To Head
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-left">
            <li>
              <Link to="/admin" className="navbar-brand">
                Admin
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              {!authed ? (
                <Link to="/login" className="navbar-brand">
                  Sign in
                </Link>
              ) : (
                <Link to="/" className="navbar-brand" onClick={logout}>
                  Logout
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default NavBar;

import './scss/app.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from './js/App';
import Store from './js/store/';

const viewStore = new Store.ViewStore();
const stores = {
  viewStore,
};

const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider {...stores}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    rootEl
  );

render(App);
if (module.hot) module.hot.accept('./js/App', () => render(App));

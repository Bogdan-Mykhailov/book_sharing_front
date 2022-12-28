import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HashRouter } from 'react-router-dom';
import { GlobalStyle } from 'global-style/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <HashRouter>
      <React.Fragment>
        <GlobalStyle />
        <App />
      </React.Fragment>
    </HashRouter>
  </Provider>,
);

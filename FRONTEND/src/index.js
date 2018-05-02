import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import App from './components/app';
import reducers from './reducers';
// import startSocketConnect from './components/etc/SocketClient';

const createStoreWithMiddleware = applyMiddleware(promise, ReduxThunk)(createStore);

// startSocketConnect(createStoreWithMiddleware);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
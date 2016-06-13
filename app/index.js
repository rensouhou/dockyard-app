/**
 * @overview
 *  Application front-end entry point
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { ipcRenderer } from 'electron';
import AppEvent from '../src/shared/constants';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

// @todo Change into something more better nice
ipcRenderer.on(AppEvent.TIMER_DONE, (event, arg) => {
  /* eslint-disable */
  new Notification(arg.title, arg);
  /* eslint-enable */
});

/** @type {ApplicationReducerState} */
const initialState = Map();

/** @type {Store} */
const store = configureStore(initialState);

const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS();
  }
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

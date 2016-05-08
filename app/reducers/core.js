/**
 * @overview
 *
 * @since 0.2.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/core-app
 * @flow
 */
import createReducer from './create-reducer';
import {
  REGISTER_GAME_VIEW,
  TAKE_SCREENSHOT,
  REGISTER_NOTIFICATION_HANDLERS
} from '../actions/core';

const initialState = {
  webview: null,
  successful: null,
  filename: null,
  notifiers: []
};

export default createReducer(initialState, {
  [REGISTER_GAME_VIEW](state, action) {
    return { ...state, webview: action.payload };
  },
  [TAKE_SCREENSHOT](state, action) {
    return { ...state, successful: true, filename: action.payload.filename };
  },
  [REGISTER_NOTIFICATION_HANDLERS](state, action) {
    return { ...state, notifiers: action.payload };
  }
});


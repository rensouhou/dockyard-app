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
  REGISTER_NOTIFICATION_HANDLERS,
  READ_CONFIGURATION
} from '../actions/core';

const initialState = {
  webview: null,
  successful: null,
  filename: null,
  notifiers: [],
  configuration: {}
};

export default createReducer(initialState, {
  [READ_CONFIGURATION](state, action) {
    return {
      ...state,
      configuration: {
        ...state.configuration,
        [action.payload.file]: action.payload.content
      }
    };
  },
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


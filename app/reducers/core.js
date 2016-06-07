/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @deprecated
 * @flow
 */
import deprecate from 'deprecate';
import createReducer from './create-reducer';
import { ApplicationEvents } from '../constants';
const {
  REGISTER_GAME_VIEW,
  TAKE_SCREENSHOT,
  REGISTER_NOTIFICATION_HANDLERS,
  READ_CONFIGURATION
} = ApplicationEvents;

const initialState = {
  webview: null,
  successful: null,
  filename: null,
  notifiers: [],
  configuration: {}
};

deprecate('app/actions/core.js is deprecated.');

export default createReducer(initialState, {
  [ApplicationEvents.READ_CONFIGURATION](state, action) {
    return {
      ...state,
      configuration: {
        ...state.configuration,
        [action.payload.file]: action.payload.content
      }
    };
  },
  // @done
  [ApplicationEvents.REGISTER_GAME_VIEW](state, action) {
    return {
      ...state,
      webview: action.payload
    };
  },
  [ApplicationEvents.TAKE_SCREENSHOT](state, action) {
    return {
      ...state,
      successful: true,
      filename: action.payload.filename
    };
  },
  [ApplicationEvents.REGISTER_NOTIFICATION_HANDLERS](state, action) {
    return { ...state, notifiers: action.payload };
  }
});


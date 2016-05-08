/**
 * @overview
 *
 * @since 0.2.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/electron
 */
const remote = require('electron').remote;
const webContents = remote.getCurrentWebContents();
const browserWindow = remote.getCurrentWindow();

const initialState = { webContents, browserWindow };

import * as InterfaceActions from '../actions/interface';

export default function electronReducer(state = initialState, action) {
  console.log(`electronReducer():call; action = ${action.type}`);
  switch (action.type) {
    case InterfaceActions.CAPTURE_SCREEN:
      return { ...state };
    case 'UPDATE_STUFF':
      return { ...state, electron: 0 };
    default:
      return state;
  }
}


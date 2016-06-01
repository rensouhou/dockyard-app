/* eslint no-console: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import { remote } from 'electron';
import * as InterfaceActions from '../actions/interface';
const webContents = remote.getCurrentWebContents();
const browserWindow = remote.getCurrentWindow();

const initialState = { webContents, browserWindow };

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


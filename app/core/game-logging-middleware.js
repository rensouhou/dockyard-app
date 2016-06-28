/* eslint-disable */
/**
 * @overview
 *  Middleware for logging in-game data
 *
 * @since 0.1.0
 * @version 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { ipcRenderer } from 'electron';
import AppEvent from '../../src/shared/constants';

const defaultOptions = {
  waitForAck: false
};

function createGameDbLogger(options = defaultOptions) {
  return ({ getState }) => (next) => (action) => {
    // If we're using something like RethinkDB, we need to handle this
    // in the main process, due to some quirks in how Electron's
    // rendering process does things.
    ipcRenderer.send(AppEvent.DB_LOG_EVENT, { action });

    return next(action);
  };
}

export default createGameDbLogger;

/**
 * @overview
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/core/rethinkdb-middleware
 */
import electron from 'electron';
import AppEvent from '../../src/shared/constants';
const { ipcRenderer } = electron;

function createGameDbLogger(options) {
  return ({ getState }) => (next) => (action) => {
    ipcRenderer.send(AppEvent.RDB_LOG_EVENT, { action });
    return next(action);
  };
}

export default createGameDbLogger;

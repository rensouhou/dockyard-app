/* eslint no-console: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import chalk from 'chalk';
import { ipcRenderer } from 'electron';
import storage from 'electron-json-storage';
import AppEvent from '../../src/shared/constants';
import { ApiEvents } from '../actions/game';

const g = chalk.green;
const gi = chalk.green.inverse;
const logEvent = (event, msg) => console.log(`${g('event')} '${gi(event)}': ${msg}`);

let scheduled = {};

const file = 'scheduled';
// @todo(@stuf): replace me with one without side effects!
const persist = () => storage.set(file, scheduled, err => console.log(err));

const schedule = (type, targetTime) => {
  ipcRenderer.send(AppEvent.TIMER_START, { targetTime });
  scheduled = { ...scheduled, [targetTime]: { type, targetTime } };
  persist();
};

function createScheduleMiddleware() {
  return ({ getState, dispatch }) => next => action => {
    switch (action.type) {
      case ApiEvents.START_MISSION:
        schedule(action.payload.targetTime);
        break;
      default:
        break;
    }
    return next(action);
  };
}

export default createScheduleMiddleware;
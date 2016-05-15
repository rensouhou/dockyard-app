/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import chalk from 'chalk';
import { ipcRenderer } from 'electron';
import { ApiEvents, GameState } from '../actions/game';
import { CREATE_TIMER, notify, scheduleEvent } from '../actions/core';
import AppEvent from '../../src/shared/constants';
import R from 'ramda';

const g = chalk.green;
const gi = chalk.green.inverse;
const logEvent = (event, msg) => console.log(`${g('event')} '${gi(event)}': ${msg}`);

const schedule = targetTime => ipcRenderer.send(AppEvent.TIMER_START, { targetTime });

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

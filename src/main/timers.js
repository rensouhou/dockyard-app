/* eslint no-console: 0, no-new: 0 */
/**
 * @overview
 *  Handles timers in the background
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { ipcMain } from 'electron';
import chalk from 'chalk';
import schedule from 'node-schedule';
import AppEvent from '../shared/constants';
import R from 'ramda';

const g = chalk.green;
const gi = chalk.green.inverse;
const logEvent = (event, msg, ...rest) => console.log(`${g('event')} ${gi(event)}: ${msg}`, rest);

const scheduledEvents = {};

const invalidate = id => {
  setTimeout(() => {
    if (!!scheduledEvents[id]) {
      delete scheduledEvents[id];
    }
  }, 100);
};

ipcMain.on(AppEvent.TIMER_START, (event, arg) => {
  if (R.isEmpty(arg)) {
    logEvent('AppEvent.TIMER_START', 'Called without valid data;', arg);
    return;
  }
  logEvent('AppEvent.TIMER_START', 'Called with:', JSON.stringify(arg));
  scheduledEvents[arg.targetTime] = schedule.scheduleJob(new Date(arg.targetTime), () => {
    const eventPayload = {
      title: `Timer ${arg.targetTime} done.`
    };
    event.sender.send(AppEvent.TIMER_DONE, eventPayload);
    invalidate(arg.targetTime);
  });
});


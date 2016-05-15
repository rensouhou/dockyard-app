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

const g = chalk.green;
const gi = chalk.green.inverse;
const logEvent = (event, msg, ...rest) => console.log(`${g('event')} ${gi(event)}: ${msg}`, rest);

ipcMain.on(AppEvent.TIMER_START, (event, arg) => {
  schedule.scheduleJob(new Date(arg.targetTime), () => {
    event.sender.send(AppEvent.TIMER_DONE, {
      title: `Timer ${arg.targetTime} done.`
    });
  });
});


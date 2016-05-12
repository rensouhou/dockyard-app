/* eslint no-console: 0 */
/**
 * @overview
 *  Core game -related actions
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import fs from 'fs';
import invariant from 'invariant';
import bluebird from 'bluebird';
import { createAction } from 'redux-actions';
import AppEvent from '../../src/shared/constants';
import electron from 'electron';
import electronStorage from 'electron-json-storage';
import chalk from 'chalk';
const ipcRenderer = electron.ipcRenderer;

// I'm going the easy way
bluebird.promisifyAll(electronStorage);

/** @type {string} Register a reference to the <webview /> holding the game SWF */
export const REGISTER_GAME_VIEW = 'REGISTER_GAME_VIEW';
export const UPDATE_CONFIGURATION = 'UPDATE_CONFIGURATION';
export const TAKE_SCREENSHOT = 'TAKE_SCREENSHOT';
export const POST_NOTIFICATION = 'POST_NOTIFICATION';
export const REGISTER_NOTIFICATION_HANDLERS = 'REGISTER_NOTIFICATION_HANDLERS';
export const NOTIFY = 'NOTIFY';
export const CREATE_TIMER = 'CREATE_TIMER';
export const SAVE_CONFIGURATION = 'SAVE_CONFIGURATION';
export const READ_CONFIGURATION = 'READ_CONFIGURATION';

type ConfigObject = {
  file: string,
  content: any
};

/**
 * Action Creators
 */
export const saveConfiguration = createAction(SAVE_CONFIGURATION,
  async(conf:ConfigObject):ConfigObject => {
    invariant(conf.file || conf.content, 'Saving configuration requires a valid configuration object.');
    let saveResult = true;
    try {
      await electronStorage.setAsync(conf.file, conf.content);
    }
    catch (e) {
      console.error(chalk.red.bold(e.stack || e));
      saveResult = false;
    }

    return saveResult;
  });

export const readConfiguration = createAction(READ_CONFIGURATION,
  async(file:string):ConfigObject => {
    invariant(file, 'A valid file name is required for reading the configuration.');

    let configObject = null;
    try {
      configObject = await electronStorage.getAsync(file);
    }
    catch (e) {
      console.error(chalk.red.bold(e.stack || e));
    }

    return configObject;
  });

// @todo(@stuf): use configuration values for screenshot targets
export const takeScreenshot = createAction(TAKE_SCREENSHOT, (view) => {
  const gameViewRect = view.getBoundingClientRect();
  const filename = `/Users/stuf/electron_${+(new Date())}.png`;
  let error = null;

  electron.remote.getCurrentWindow().capturePage({
    x: gameViewRect.left,
    y: gameViewRect.top,
    width: gameViewRect.width,
    height: gameViewRect.height
  }, (image) => {
    fs.writeFile(filename, image.toPng(), (err) => {
      if (err) error = err;
      console.log(`Screenshot saved as: ${filename}`);
    });
  });

  return { error, filename };
});

export const registerGameView = createAction(REGISTER_GAME_VIEW, webview => webview);

export const registerNotificationHandlers = createAction(REGISTER_NOTIFICATION_HANDLERS, handlers => handlers);

export const notify = createAction(NOTIFY, (title, options) => new Notification(title, options));

export const createTimer = createAction(CREATE_TIMER, async args => {
  ipcRenderer.send(AppEvent.TIMER_START, { ...args });

  const result = await new Promise((resolve, reject) => {
    ipcRenderer.once(AppEvent.TIMER_STARTED, (event, payload) => resolve(payload));
  });

  return result;
});

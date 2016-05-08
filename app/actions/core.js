/// <reference path="../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Core game -related actions
 *
 * @since 0.2.0
 * @version 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/actions/core
 */
import fs from 'fs';
import { createAction } from 'redux-actions';
import AppEvent from '../../src/shared/constants';
import electron from 'electron';
const ipcRenderer = electron.ipcRenderer;

/** @type {string} Register a reference to the <webview /> holding the game SWF */
export const REGISTER_GAME_VIEW = 'REGISTER_GAME_VIEW';
export const UPDATE_CONFIGURATION = 'UPDATE_CONFIGURATION';
export const TAKE_SCREENSHOT = 'TAKE_SCREENSHOT';
export const POST_NOTIFICATION = 'POST_NOTIFICATION';
export const REGISTER_NOTIFICATION_HANDLERS = 'REGISTER_NOTIFICATION_HANDLERS';
export const NOTIFY = 'NOTIFY';
export const CREATE_TIMER = 'CREATE_TIMER';

/**
 * Action Creators
 */

// @todo(@stuf): use configuration values for screenshot targets
export const takeScreenshot = createAction(TAKE_SCREENSHOT, (view) => {
  const electron = require('electron');
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

/* eslint no-console: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import fs from 'fs';
import { createAction } from 'redux-actions';
import { ipcRenderer, remote as electronRemote } from 'electron';
import AppEvent from '../../src/shared/constants';

//
// Application Events
//
export const REGISTER_GAME_VIEW = 'REGISTER_GAME_VIEW';
export const UPDATE_CONFIGURATION = 'UPDATE_CONFIGURATION';
export const TAKE_SCREENSHOT = 'TAKE_SCREENSHOT';
export const POST_NOTIFICATION = 'POST_NOTIFICATION';
export const REGISTER_NOTIFICATION_HANDLERS = 'REGISTER_NOTIFICATION_HANDLERS';
export const NOTIFY = 'NOTIFY';
export const CREATE_TIMER = 'CREATE_TIMER';
export const SAVE_CONFIGURATION = 'SAVE_CONFIGURATION';
export const READ_CONFIGURATION = 'READ_CONFIGURATION';

/**
 * @description
 *  Screenshot action handler
 */
export const takeScreenshot = createAction(TAKE_SCREENSHOT, view => {
  const gameViewRect = view.getBoundingClientRect();
  const filename = `/Users/stuf/electron_${+(new Date())}.png`;
  let error = null;

  electronRemote.getCurrentWindow().capturePage({
    x: gameViewRect.left,
    y: gameViewRect.top,
    width: gameViewRect.width,
    height: gameViewRect.height
  }, async image => {
    try {
      await fs.writeFileAsync(filename, image.toPng());
    }
    catch (e) {
      error = e;
    }
  });

  return { error, filename };
});

/**
 * @description
 *  Game view registration action creator
 */
export const registerGameView = createAction(REGISTER_GAME_VIEW, webview => webview);

/**
 * @description
 *  Desktop notification action creator
 */
export const notify = createAction(NOTIFY, (title, options) => new Notification(title, options));

/**
 * @description
 *  Scheduled events action creator
 */
export const scheduleEvent = createAction(CREATE_TIMER, args => {
  console.error('action:scheduleEvent', args);
  const payload = { targetTime: args.targetTime };
  ipcRenderer.send(AppEvent.TIMER_START, payload);
  return payload;
});

export const actions = { scheduleEvent, notify, registerGameView, takeScreenshot };

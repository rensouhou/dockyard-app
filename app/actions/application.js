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
export const MUTE_AUDIO = 'MUTE_AUDIO';
export const UNMUTE_AUDIO = 'UNMUTE_AUDIO';
export const TOGGLE_AUDIO = 'TOGGLE_AUDIO';

export const takeScreenshot = createAction(TAKE_SCREENSHOT,
  /**
   * @description
   *  Screenshot action handler
   *
   * @param webview
   * @return {Object}
   */
  (webview) => {
    const gameViewRect = webview.getBoundingClientRect();
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
  }
);

export const registerGameView = createAction(REGISTER_GAME_VIEW,
  /**
   * @description
   *  Game view registration action creator
   *
   * @param webview
   */
  (webview) => webview
);

export const notify = createAction(NOTIFY,
  /**
   * @description
   *  Desktop notification action creator
   *
   * @param {!string} title
   * @param {Object} options
   * @return {Notification}
   */
  (title, options) => new Notification(title, options)
);

export const scheduleEvent = createAction(CREATE_TIMER,
  /**
   * @description
   *  Scheduled events action creator
   *
   * @param args
   * @returns {{targetTime: *}}
   */
  (args) => {
    console.error('action:scheduleEvent', args);
    const payload = { targetTime: args.targetTime };
    ipcRenderer.send(AppEvent.TIMER_START, payload);
    return payload;
  }
);

export const toggleAudio = createAction(TOGGLE_AUDIO,
  /**
   * @param webview
   * @returns {boolean}
   */
  (webview) => {
    const audioMuteToggled = !webview.isAudioMuted();
    webview.setAudioMuted(audioMuteToggled);
    return audioMuteToggled;
  }
);

export const actions = { scheduleEvent, notify, registerGameView, takeScreenshot, toggleAudio };

/* eslint no-console: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 *
 * @todo Clear cookies (session.clearStorageData)
 */
import fs from 'fs';
import { createAction } from 'redux-actions';
import { ipcRenderer, remote as electronRemote } from 'electron';
import MainProcEvent from '../../src/shared/constants';
import { ApplicationEvents } from '../constants';

export const takeScreenshot = createAction(ApplicationEvents.TAKE_SCREENSHOT,
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

export const registerGameView = createAction(ApplicationEvents.REGISTER_GAME_VIEW,
  /**
   * @description
   *  Game view registration action creator
   *
   * @param webview
   */
  (webview) => webview
);

export const notify = createAction(ApplicationEvents.NOTIFY,
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

export const scheduleEvent = createAction(ApplicationEvents.CREATE_TIMER,
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
    ipcRenderer.send(MainProcEvent.TIMER_START, payload);
    return payload;
  }
);

export const toggleAudio = createAction(ApplicationEvents.TOGGLE_AUDIO,
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

export const createdEntity = createAction(ApplicationEvents.CREATED_ENTITY,
  /**
   * Action dispatched with a completed entity record.
   * @param {CreatedEntityRecord} entity
   * @returns {CreatedEntityRecord}
   */
  (entity) => entity
);

export const actions = {
  scheduleEvent,
  notify,
  registerGameView,
  takeScreenshot,
  toggleAudio,
  createdEntity
};

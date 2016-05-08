/// <reference path="../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Actions that will be scheduled and/or run in the background
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/actions/background
 */
import { createAction } from 'redux-actions';
import electron from 'electron';
import AppEvent from '../../src/shared/constants';

const { ipcRenderer } = electron;

export const CREATE_TIMER = 'CREATE_TIMER';
export const CLEAR_TIMER = 'CLEAR_TIMER';

export const createTimer = createAction(CREATE_TIMER, async args => {
  ipcRenderer.send(AppEvent.TIMER_START, { ...args });

  const result = await new Promise((resolve, reject) => {
    ipcRenderer.once(AppEvent.TIMER_STARTED, (event, payload) => resolve(payload));
  });

  return result;
});
export const clearTimer = createAction(CLEAR_TIMER, () => null);

/* eslint no-case-declarations:0,no-new:0,no-console:0 */
/**
 * @overview
 *  Back-end implementation for RDB logging.
 *  Electron + Webpack has issues and I want to log my event data. 🙃
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/core/db-logger
 */
const thinky = require('thinky')({ db: 'dockyard_rdb' });
const type = thinky.type;
const schema = require('./schema/rdb')(thinky, type);

import { ipcMain } from 'electron';
import AppEvent from '../shared/constants';

const ApiEvent = require('../../app/constants/api-events').ApiEvents;

ipcMain.on(AppEvent.REHYDRATE_STORE_REQUEST, event => {
  event.sender.send(AppEvent.REHYDRATE_STORE);
});

ipcMain.on(AppEvent.RDB_LOG_EVENT, (event, arg) => {
  const eventType = arg.action.type;
  const payload = arg.action.payload;

  new schema.GameEvent({ type: payload.type }).saveAll();

  // Log material state
  const materialLogEvents = [
    ApiEvent.GET_BASE_DATA,
    ApiEvent.RESUPPLY_SHIP,
    ApiEvent.GET_MATERIAL,
    ApiEvent.CRAFT_ITEM,
    ApiEvent.DESTROY_SHIP
  ];

  if (materialLogEvents.includes(eventType)) {
    console.log('Logging material state');
    new schema.MaterialState(payload.materials).saveAll();
  }
});

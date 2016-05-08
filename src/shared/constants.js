/**
 * @overview
 *  Constants shared between main- and renderer process
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/shared/constants
 */
module.exports = {
  TIMER_START: 'TIMER_START',
  TIMER_STARTED: 'TIMER_START_ACK',
  TIMER_SYNC: 'TIMER_SYNC',
  TIMER_STOP: 'TIMER_STOP',
  TIMER_CLEAR: 'TIMER_CLEAR',
  TIMER_DONE: 'TIMER_DONE',
  TIMER_ERROR: 'TIMER_ERROR',
  RDB_LOG_EVENT: 'RDB_LOG_EVENT',
  REHYDRATE_STORE_REQUEST: 'REHYDRATE_STORE_REQUEST',
  REHYDRATE_STORE: 'REHYDRATE_STORE',
  DEHYDRATE_STORE: 'DEHYDRATE_STORE'
};

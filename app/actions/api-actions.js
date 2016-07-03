/**
 * @overview
 *  API handler action creator
 *  Takes a key-value -pair representing the event to handle as key and its respective
 *  handler function as the value.
 *
 *  Event-to-URL mapping is done in {@link ApiEventPaths}.
 *
 * @since 0.2.0
 * @version 0.3.0
 */
import { Seq, Map } from 'immutable';
import { createAction } from 'redux-actions';
import { Internal } from '../records';
import { ApiEventPaths } from '../constants';
import * as apiHandlerFns from '../actions/kcsapi';

/**
 * Ensure that the action handlers are mapped into {@link ApiHandler} records.
 * @type {Immutable.Iterable<any, any>}
 * @since 0.2.0
 */
export const handlers = Seq.Keyed(ApiEventPaths)
                           .flatMap((path, event) =>
                             Map.of(event, new Internal.ApiHandler({ path, event, handler: apiHandlerFns[event] })));

/**
 * A non-`Seq` version of the @see findEventSeq function.
 * @param {string} findPath
 * @returns {string}
 * @since 0.2.0
 * @version 0.3.0
 */
export const findEvent = (findPath) => {
  const pathRegex = new RegExp(`^${findPath}$`);
  return ApiEventPaths.findKey((path) => pathRegex.test(path));
};

/**
 * Create a `Seq` of action handlers that is in a usable form for the Redux application.
 * @type {Immutable.Iterable<any, any>}
 * @since 0.2.0
 */
export const actionHandlers = Seq.Keyed(handlers)
                                 .flatMap((handlerRecord, event) =>
                                   Map.of(event, createAction(event, handlerRecord.handler)));

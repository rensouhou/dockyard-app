/**
 * @overview
 *  Proposal for unifying API actions and constants into one place. Maybe.
 *  Goal is to get an easier-to-use way of creating the API event handlers,
 *  and a better way to look up events by path.
 *
 * @since 0.2.0
 */
import { Seq, Map } from 'immutable';
import { createAction } from 'redux-actions';
import { Internal } from '../records';
import { ApiEventPaths } from '../constants';
import kcsapiHandlers from '../actions/kcsapi';

/**
 * Ensure that the action handlers are mapped into {@link ApiHandler} records.
 * @type {Iterable<any, any>}
 */
export const handlers = Seq.Keyed(ApiEventPaths)
                           .flatMap((path, event) =>
                             Map.of(event, new Internal.ApiHandler({ path, event, handler: kcsapiHandlers[event] })));

/**
 * A non-`Seq` version of the @see findEventSeq function.
 * @param findPath
 * @returns {K|*}
 */
export const findEvent = (findPath) => {
  const pathRegex = new RegExp(`^${findPath}`);
  return ApiEventPaths.findKey((path) => pathRegex.test(path));
};

/**
 * Create a `Seq` of action handlers that is in a usable form for the Redux application.
 * @type {Iterable<any, any>}
 */
export const actionHandlers = Seq.Keyed(handlers)
                                 .flatMap((handlerRecord, event) =>
                                   Map.of(event, createAction(event, handlerRecord.handler)));

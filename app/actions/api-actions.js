/**
 * @overview
 *  Proposal for unifying API actions and constants into one place. Maybe.
 *  Goal is to get an easier-to-use way of creating the API event handlers,
 *  and a better way to look up events by path.
 *
 * @since 0.1.0
 */
import { Seq } from 'immutable';
import { createAction } from 'redux-actions';
import { Internal } from '../records';
import { ApiEventPaths as ApiEventPath } from '../constants';
import kcsapiHandlers from '../actions/kcsapi';

export const handlers = Seq
  .Keyed(ApiEventPath)
  .mapEntries((path, event) => [
    event,
    new Internal.ApiHandler({ path, event, handler: kcsapiHandlers[event] })
  ]);

export const findEventSeq = (findPath) => {
  const pathRegex = new RegExp(`^${findPath}`);
  return Seq.Keyed(ApiEventPath).findKey((path) => pathRegex.test(path));
};

export const findEvent = (findPath) => {
  const pathRegex = new RegExp(`^${findPath}`);
  return ApiEventPath.findKey((path) => pathRegex.test(path));
};

export const actionHandlers = Seq
  .Keyed(handlers)
  .mapEntries((event, handler) => [event, createAction(event, handler)]);

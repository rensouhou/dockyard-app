/**
 * @overview
 *  Handler for the `GET_OPPONENT_INFO` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { asProfileRecord, asFleetRecord } from '../../transformers/api/opponent-fleet';

/**
 * Handler function for the `GET_OPPONENT_INFO` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {IMap<string, *>}
 * @constructor
 */
export default function GET_OPPONENT_INFO(apiAction) {
  const { body } = apiAction;
  return fromJS({
    profile: asProfileRecord(body),
    fleet: asFleetRecord(body)
  });
}

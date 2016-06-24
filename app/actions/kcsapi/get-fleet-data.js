/**
 * @overview
 */
import { List, fromJS } from 'immutable';
import { asFleetRecord } from '../../transformers/api/player-fleet';

/**
 * Handler function for the `GET_FLEET_DATA` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.3.0
 * @version 0.3.0
 */
export default function GET_FLEET_DATA(apiAction) {
  const { body } = apiAction;
  return fromJS({
    fleets: List(body).map(asFleetRecord)
  });
}

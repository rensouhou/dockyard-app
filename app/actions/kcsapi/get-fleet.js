/**
 * @overview
 *  Handler for `GET_FLEET` event
 */
import R from 'ramda';
import { List, fromJS } from 'immutable';
import { getArrayOrDefault, asNumber } from '../../transformers/primitive';
import { asFleetRecord } from '../../transformers/api/player-fleet';
import { playerShip } from '../../transformers/api/player-ship';

/**
 * Handler function for the `GET_FLEET` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function GET_FLEET(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({
    fleet: asFleetRecord(R.head(body.api_deck_data)),
    fleetId: asNumber(postBody.api_deck_rid),
    ships: List(getArrayOrDefault(body.api_ship_data)).map(playerShip)
  });
}

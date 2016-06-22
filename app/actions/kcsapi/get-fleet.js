/**
 * @overview
 *  Handler for `GET_FLEET` event
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { List, fromJS } from 'immutable';
import { getArrayOrDefault, asNumber } from '../../transformers/primitive';
import { asFleetRecord } from '../../transformers/api/player-fleet';
import { playerShip } from '../../transformers/api/player-ship';

/**
 *
 * @param {ApiActionRecord} p
 * @returns {IMap<string, *>}
 * @constructor
 */
export default function GET_FLEET(p) {
  const { body, postBody } = p;
  return fromJS({
    fleet: asFleetRecord(R.head(body.api_deck_data)),
    fleetId: asNumber(postBody.api_deck_rid),
    ships: List(getArrayOrDefault(body.api_ship_data)).map(playerShip)
  });
}

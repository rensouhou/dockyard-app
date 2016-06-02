/**
 * @overview
 *  Handler for `GET_FLEET` event
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { List } from 'immutable';
import { Fleet } from '../../records';
import { getArrayOrDefault, asNumber } from '../../transformers/primitive';
import { playerFleet } from '../../transformers/api/player-fleet';
import { playerShip } from '../../transformers/api/player-ship';

export default function GET_FLEET({ body, postBody }) {
  return {
    fleet: new Fleet(playerFleet(R.head(body.api_deck_data))),
    fleetId: asNumber(postBody.api_deck_rid),
    ships: List(getArrayOrDefault(body.api_ship_data)).map(playerShip)
  };
}

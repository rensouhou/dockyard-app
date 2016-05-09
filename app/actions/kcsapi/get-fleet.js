/**
 * @overview
 *  Handler for `GET_FLEET` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import R from 'ramda';
import { getArrayOrDefault, asNumber } from '../../transformers/primitive';
import { playerFleet } from '../../transformers/api/player-fleet';
import { playerShip as ship } from '../../transformers/api/player-ship';

export default function ({ body, postBody }) {
  return {
    fleet: playerFleet(R.head(body.api_deck_data)),
    fleetId: asNumber(postBody.api_deck_rid),
    ships: R.map(ship, getArrayOrDefault(body.api_ship_data))
  };
}

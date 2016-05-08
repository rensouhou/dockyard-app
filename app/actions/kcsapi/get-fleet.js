/**
 * @overview
 *  Handler for `GET_FLEET` event
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/get-fleet
 * @see {@link __PROTO.AppState}
 */
import deprecate from 'deprecate';
import R from 'ramda';
import { getArrayOrDefault, asNumber } from '../../transformers/primitive';
import { playerFleet } from '../../transformers/api/player-fleet';
import { playerShip as ship } from '../../transformers/api/player-ship';

/**
 * @event GET_FLEET
 * @param {__PROTO.ApiRequest} r
 * @todo(@stuf): remove R.indexBy(...) logic
 */
export default function action$getFleet(r) {
  console.log('GET_FLEET r:ApiRequest =>', r);
  deprecate('Remove redundant R.indexBy(...) logic');

  const postBody = r.postBody;

  const fleet = playerFleet(R.head(r.body.api_deck_data));
  const fleetId = asNumber(postBody.api_deck_rid);

  return {
    fleet: fleet,
    fleetId: fleetId,
    ships: R.map(ship, getArrayOrDefault(r.body.api_ship_data))
  };
}

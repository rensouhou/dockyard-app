/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *  Handler for `GET_BASE_DATA` event
 *
 * @since 0.1.0
 */
import { Map, List } from 'immutable';
import { asNumber } from '../../transformers/primitive';
import { parseMaterialObjects } from '../../transformers/api/materials';
import { playerShip } from '../../transformers/api/player-ship';
import { playerProfile } from '../../transformers/api/player-profile';
import { playerFleet } from '../../transformers/api/player-fleet';

export default function GET_BASE_DATA({ body }) {
  return Map({
    id: asNumber(body.api_basic.api_member_id),
    profile: playerProfile(body.api_basic),
    fleets: List(body.api_deck_port).map(playerFleet),
    ships: List(body.api_ship).map(playerShip),
    materials: parseMaterialObjects(body.api_material)
  });
}

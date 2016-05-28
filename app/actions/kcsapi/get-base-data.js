/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *  Handler for `GET_BASE_DATA` event
 *
 * @since 0.1.0
 */
import { parseMaterialObjects } from '../../transformers/api/materials';
import { playerShip } from '../../transformers/api/player-ship';
import { playerProfile } from '../../transformers/api/player-profile';
import { playerFleet } from '../../transformers/api/player-fleet';

export default function GET_BASE_DATA({ body }) {
  const id = body.api_basic.api_member_id;
  const profile = playerProfile(body.api_basic);
  const fleets = body.api_deck_port.map(playerFleet);
  const ships = body.api_ship.map(playerShip);
  const materials = parseMaterialObjects(body.api_material);

  return { id, profile, fleets, ships, materials };
}

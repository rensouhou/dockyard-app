/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *  Handler for `GET_BASE_DATA` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import { parseMaterialObjects } from '../../transformers/api/materials';
import { playerShip as ship } from '../../transformers/api/player-ship';
import { playerProfile as profile } from '../../transformers/api/player-profile';
import { playerFleet as fleet } from '../../transformers/api/player-fleet';

export default function GET_BASE_DATA({ body }) {
  return {
    id: body.api_basic.api_member_id,
    profile: profile(body.api_basic),
    fleets: body.api_deck_port.map(fleet),
    ships: body.api_ship.map(ship),
    materials: parseMaterialObjects(body.api_material)
  };
};

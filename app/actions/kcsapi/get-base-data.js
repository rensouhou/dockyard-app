/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *  Handler for `GET_BASE_DATA` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { asNumber } from '../../transformers/primitive';
import { parseMaterialObjects, asRecord } from '../../transformers/api/materials';
import { playerShip } from '../../transformers/api/player-ship';
import { playerProfile } from '../../transformers/api/player-profile';
import { playerFleet } from '../../transformers/api/player-fleet';

/**
 * Handler for the `GET_BASE_DATA` API event
 *
 * @name GET_BASE_DATA
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.3.0
 */
export default function GET_BASE_DATA(apiAction) {
  const { body } = apiAction;
  return fromJS({
    id: asNumber(body.api_basic.api_member_id),
    profile: playerProfile(body.api_basic),
    fleets: body.api_deck_port.map(playerFleet),
    ships: body.api_ship.map(playerShip),
    materials: asRecord(parseMaterialObjects(body.api_material))
  });
}

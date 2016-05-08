/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *  Handler for `GET_BASE_DATA` event
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/get-base-data
 * @see {@link __PROTO.AppState}
 * @flow
 */
import type { ApiRequest, ApiRequestResult } from '../../types/api';
import { parseMaterialObjects } from '../../transformers/api/materials';
import { playerShip as ship } from '../../transformers/api/player-ship';
import { playerProfile as profile } from '../../transformers/api/player-profile';
import { playerFleet as fleet } from '../../transformers/api/player-fleet';
import { mission } from '../../transformers/api/mission';

/**
 * @event GET_BASE_DATA
 * @param {KCSApi.API.GET_BASE_DATA} r
 * @returns {Dockyard.API.GetBaseData}
 */
export default function action$getBaseData(r:ApiRequest):ApiRequestResult {
  return {
    id: r.body.api_basic.api_member_id,
    profile: profile(r.body.api_basic),
    fleets: r.body.api_deck_port.map(fleet),
    ships: r.body.api_ship.map(ship),
    materials: parseMaterialObjects(r.body.api_material)
  };
}

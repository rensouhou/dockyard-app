/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `LOAD_FLEET_PRESET` event
 *
 * @since 0.3.0
 * @version 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/load-fleet-preset
 */
import R from 'ramda';
import { playerFleet } from '../../transformers/api/player-fleet';
import { asNumber } from '../../transformers/primitive';

/**
 * @event LOAD_FLEET_PRESET
 * @param {__PROTO.ApiRequest} r
 * @returns {__PROTO.ApiRequestResponse}
 */
export default function action$loadFleetPreset(r) {
  return {
    fleet: playerFleet(r.body),
    fleetId: asNumber(r.postBody.api_deck_id),
    presetId: asNumber(r.postBody.api_preset_id)
  };
}

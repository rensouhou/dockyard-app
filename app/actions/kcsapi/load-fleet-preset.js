/**
 * @overview
 *  Handler for `LOAD_FLEET_PRESET` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { playerFleet } from '../../transformers/api/player-fleet';
import { asNumber } from '../../transformers/primitive';

/**
 * Handler function for the `LOAD_FLEET_PRESET` event
 *
 * @name LOAD_FLEET_PRESET
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function LOAD_FLEET_PRESET(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({
    fleet: playerFleet(body),
    fleetId: asNumber(postBody.api_deck_id),
    presetId: asNumber(postBody.api_preset_id)
  });
}

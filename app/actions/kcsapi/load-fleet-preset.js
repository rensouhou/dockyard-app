/**
 * @overview
 *  Handler for `LOAD_FLEET_PRESET` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { playerFleet } from '../../transformers/api/player-fleet';
import { asNumber } from '../../transformers/primitive';

export default function LOAD_FLEET_PRESET({ body, postBody }) {
  return Map({
    fleet: playerFleet(body),
    fleetId: asNumber(postBody.api_deck_id),
    presetId: asNumber(postBody.api_preset_id)
  });
}

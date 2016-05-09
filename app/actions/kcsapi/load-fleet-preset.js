/**
 * @overview
 *  Handler for `LOAD_FLEET_PRESET` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { playerFleet } from '../../transformers/api/player-fleet';
import { asNumber } from '../../transformers/primitive';

export default function ({ body, postBody }) {
  return {
    fleet: playerFleet(body),
    fleetId: asNumber(postBody.api_deck_id),
    presetId: asNumber(postBody.api_preset_id)
  };
}

/**
 * @overview
 *  Handler for `START_MISSION` event
 *
 * @since 0.1.0
 */
import { asNumber } from '../../transformers/primitive';

export default function({ body, postBody }) {
  return {
    targetTime: body.api_complatetime,
    fleetId: asNumber(postBody.api_deck_id),
    missionId: asNumber(postBody.api_mission_id)
  };
}

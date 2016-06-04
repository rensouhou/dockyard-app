/**
 * @overview
 *  Handler for `START_MISSION` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { asNumber } from '../../transformers/primitive';

export default function START_MISSION({ body, postBody }) {
  return Map({
    targetTime: body.api_complatetime,
    fleetId: asNumber(postBody.api_deck_id),
    missionId: asNumber(postBody.api_mission_id)
  });
}

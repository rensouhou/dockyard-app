/**
 * @overview
 *  Handler for `START_MISSION` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { asNumber } from '../../transformers/primitive';

/**
 * @name START_MISSION
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.3.0
 */
export default function START_MISSION(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({
    targetTime: body.api_complatetime,
    fleetId: asNumber(postBody.api_deck_id),
    missionId: asNumber(postBody.api_mission_id)
  });
}

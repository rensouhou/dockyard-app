/**
 * @overview
 *  Handler for `COMPLETE_QUEST` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { asNumber } from '../../transformers/primitive';
import { parseMaterialArray, asRecord } from '../../transformers/api/materials';

/**
 * Handler function for the `COMPLETE_QUEST` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function COMPLETE_QUEST(apiAction) {
  const { body, postBody } = apiAction;
  return Map({
    id: asNumber(postBody.api_quest_id),
    materials: asRecord(parseMaterialArray(body.api_material)),
    rewards: {
      count: body.api_bounus_count,
      items: body.api_bounus
    }
  });
}

/**
 * @overview
 *
 * @since 0.2.0
 * @module app/actions/kcsapi/stop-quest
 */
import { fromJS } from 'immutable';
import { asNumber } from '../../transformers/primitive';

/**
 * Handler function for the `STOP_QUEST` event
 *
 * @name STOP_QUEST
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.2.0
 * @version 0.3.0
 */
export default function STOP_QUEST(apiAction) {
  const { postBody } = apiAction;
  return fromJS({
    quest: {
      id: asNumber(postBody.api_quest_id)
    }
  });
}

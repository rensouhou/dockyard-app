/**
 * @overview
 *  Handler for `START_QUEST` action
 *
 * @since 0.1.0
 * @module app/actions/kcsapi/start-quest
 */
import { fromJS } from 'immutable';
import { asNumber } from '../../transformers/primitive';

/**
 * Handler function for the `START_QUEST` event
 *
 * @name START_QUEST
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.3.0
 */
export default function START_QUEST(apiAction) {
  const { postBody } = apiAction;
  return fromJS({
    quest: {
      id: asNumber(postBody.api_quest_id)
    }
  });
}

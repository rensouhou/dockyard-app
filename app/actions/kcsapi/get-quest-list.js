/**
 * @overview
 *  Handler for `GET_QUEST_LIST` event
 *
 * @since 0.1.0
 */
import { Map, fromJS } from 'immutable';
import { questListTabs } from '../../enums';
import { asNumber } from '../../transformers/primitive';
import { quest as transformQuest } from '../../transformers/api/quest';

/**
 * @private
 * @type {function}
 * @param {Array<Object>} list
 */
const questList = (list) => fromJS(list).toMap()
                                        .map((q) => fromJS(transformQuest(q)))
                                        .flatMap((q) => Map.of(q.id, q));

/**
 * Handler function for the `GET_QUEST_LIST` event.
 *
 * @param {ApiActionRecord} p
 * @returns {any}
 * @constructor
 */
export default function GET_QUEST_LIST(p) {
  const { body, postBody } = p;
  return fromJS({
    questCount: asNumber(body.api_count),
    currentPage: asNumber(body.api_disp_page),
    currentlyActiveTab: questListTabs(postBody.api_tab_id),
    totalPageCount: asNumber(body.api_page_count),
    quests: questList(body.api_list)
  });
}

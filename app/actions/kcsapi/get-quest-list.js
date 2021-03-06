/**
 * @overview
 *  Handler for `GET_QUEST_LIST` event
 *
 * @since 0.1.0
 */
import { Map, List, fromJS } from 'immutable';
import { questListTabs } from '../../enums';
import { asNumber, notEmpty } from '../../transformers/primitive';
import { questAsRecord } from '../../transformers/api/quest';

/**
 * Handler function for the `GET_QUEST_LIST` event.
 *
 * @name GET_QUEST_LIST
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.3.0
 */
export default function GET_QUEST_LIST(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({
    questListState: {
      totalQuestCount: asNumber(body.api_count),
      currentPage: asNumber(body.api_disp_page),
      currentActiveTab: questListTabs(postBody.api_tab_id),
      totalPageCount: asNumber(body.api_page_count)
    },
    records: List(body.api_list).filter((q) => notEmpty(q))
                                .map((q) => questAsRecord(q))
                                .toMap()
                                .flatMap((q) => Map.of(q.id, q))
  });
}

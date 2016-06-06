/**
 * @overview
 *  Handler for `GET_QUEST_LIST` event
 *
 * @since 0.1.0
 */
import { Map, fromJS } from 'immutable';
import { asNumber } from '../../transformers/primitive';
import { quest as transformQuest } from '../../transformers/api/quest';

export default function GET_QUEST_LIST({ body }) {
  return fromJS({
    questCount: asNumber(body.api_count),
    currentPage: asNumber(body.api_disp_page),
    totalPageCount: asNumber(body.api_page_count),
    quests: fromJS(body.api_list).toMap()
                                 .map((q) => fromJS(transformQuest(q)))
                                 .flatMap((q) => Map.of(q.id, q))
  });
}

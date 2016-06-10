/**
 * @overview
 *  Handler for `GET_QUEST_LIST` event
 *
 * @since 0.1.0
 */
import { Map, fromJS } from 'immutable';
import { Enum } from '../../helpers';
import { asNumber } from '../../transformers/primitive';
import { quest as transformQuest } from '../../transformers/api/quest';

const questListTabs = Enum({
  DEFAULT: 0,
  DAILY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
  ONE_TIME: 4,
  OTHERS: 5,
  IN_PROGRESS: 9
});

export default function GET_QUEST_LIST({ body, postBody }) {
  return fromJS({
    questCount: asNumber(body.api_count),
    currentPage: asNumber(body.api_disp_page),
    currentlyActiveTab: questListTabs(postBody.api_tab_id),
    totalPageCount: asNumber(body.api_page_count),
    quests: fromJS(body.api_list).toMap()
                                 .map((q) => fromJS(transformQuest(q)))
                                 .flatMap((q) => Map.of(q.id, q))
  });
}

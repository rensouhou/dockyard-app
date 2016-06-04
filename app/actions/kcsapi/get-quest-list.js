/**
 * @overview
 *  Handler for `GET_QUEST_LIST` event
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { Map } from 'immutable';
import { asNumber } from '../../transformers/primitive';
import { quest as transformQuest } from '../../transformers/api/quest';

export default function GET_QUEST_LIST({ body }) {
  return Map({
    questCount: asNumber(body.api_count),
    currentPage: asNumber(body.api_disp_page),
    totalPageCount: asNumber(body.api_page_count),
    quests: Map(R.indexOf(R.prop('id'), body.api_list.map(transformQuest)))
  });
}

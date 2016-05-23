/**
 * @overview
 *  Handler for `GET_QUEST_LIST` event
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { getArrayOrDefault } from '../../transformers/primitive';
import { quest as transformQuest } from '../../transformers/api/quest';

export default function ({ body }) {
  return {
    questCount: body.api_count,
    currentPage: body.api_disp_page,
    totalPageCount: body.api_page_count,
    quests: R.indexOf(R.prop('id'), getArrayOrDefault(body.api_list).map(transformQuest)),
    $_unknown: {
      execCount: body.api_exec_count,
      execType: body.api_exec_type
    },
    $_finalized: false
  };
}

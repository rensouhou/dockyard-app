/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `GET_QUEST_LIST` event
 *
 * @since 0.3.0
 * @version 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/get-quest-list
 */
import R from 'ramda';
import { getArrayOrDefault } from '../../transformers/primitive';
import { quest as transformQuest } from '../../transformers/api/quest';

/**
 * @param {KCS.Models.Quest} r
 * @returns {Dockyard.API.GetQuestList}
 */
export default function action$getQuestList(r) {
  return {
    questCount: r.body.api_count,
    currentPage: r.body.api_disp_page,
    totalPageCount: r.bodyapi_page_count,
    quests: R.indexOf(R.prop('id'), getArrayOrDefault(r.body.api_list).map(transformQuest)),
    $_unknown: {
      execCount: r.body.api_exec_count,
      execType: r.body.api_exec_type
    },
    $_finalized: false
  };
}

/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `START_QUEST` action
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/start-quest
 * @flow
 */
import type { ApiRequest, ApiRequestResult } from '../../types/api';
import { asNumber } from '../../transformers/primitive';

/**
 * @event START_QUEST
 * @param {__PROTO.ApiRequest} r
 * @returns {number}
 */
export default function action$startQuest(r:ApiRequest):ApiRequestResult {
  return asNumber(r.postBody.api_quest_id);
}

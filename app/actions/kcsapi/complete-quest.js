/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `COMPLETE_QUEST` event
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcspai/complete-quest
 */
import { asNumber } from '../../transformers/primitive';
import { parseMaterialArray } from '../../transformers/api/materials';

/**
 * @event COMPLETE_QUEST
 * @param {KCSApi.API.COMPLETE_QUEST} r
 */
export default function action$completeQuest(r) {
  return {
    id: asNumber(r.postBody.api_quest_id),
    materials: parseMaterialArray(r.body.api_material),
    rewards: {
      count: r.body.api_bounus_count,
      items: r.body.api_bounus
    }
  };
}

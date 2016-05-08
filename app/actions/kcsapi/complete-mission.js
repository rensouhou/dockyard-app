/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/complete-mission
 */
import R from 'ramda';
import { parseMaterialArray } from '../../transformers/api/materials';
import { asNumber, getObjectOrDefault } from '../../transformers/primitive';
import { Enum } from '../../helpers';

/**
 * @type {KCSApi.MissionResult}
 */
const missionResult = Enum({
  FAILURE: 0,
  SUCCESS: 1,
  HUGE_SUCCESS: 2
});

/**
 * @param {KCSApi.API.COMPLETE_MISSION.body.api_get_item1} it
 */
const parseReward = it => ({ id: it.api_useitem_id, amount: it.api_useitem_count });

/**
 * @param {Array<number>} ids
 * @param {Array<[number, number]>} exp
 */
const collectShipExperience = (ids, exp) => R.mergeAll(R.zipObj(ids, exp));

/**
 * @param {KCSApi.API.COMPLETE_MISSION} r
 * @event COMPLETE_MISSION
 */
export default function action$completeMission(r) {
  return {
    fleetId: asNumber(r.postBody.api_deck_id),
    result: missionResult(r.body.api_clear_result),
    map: {
      area: r.body.api_maparea_name,
      name: r.body.api_quest_name,
      level: r.body.api_quest_level
    },
    rewards: [r.body.api_get_item1, r.body.api_get_item2].map(getObjectOrDefault).map(parseReward),
    materials: parseMaterialArray(r.body.api_get_material),
    ships: r.body.api_ship_id.slice[1]
    // experience: collectShipExperience(r.body.api_ship_id.slice[1], r.body.api_get_exp_lvup)
  };
}

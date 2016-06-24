/**
 * @overview
 *  Handler for the `COMPLETE_MISSION` event
 *
 * @since 0.1.0
 */
import { List, Map, fromJS } from 'immutable';
import { parseMaterialArray, asRecord } from '../../transformers/api/materials';
import { asNumber, getObjectOrDefault } from '../../transformers/primitive';
import { Enum } from '../../helpers';

const missionResult = Enum({
  FAILURE: 0,
  SUCCESS: 1,
  HUGE_SUCCESS: 2
});

/**
 * @private
 * @returns {MissionReward}
 */
const parseReward = ({ api_useitem_id, api_useitem_count }) => Map({
  id: api_useitem_id,
  amount: api_useitem_count
});

/**
 * Handler function for the `COMPLETE_MISSION` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function COMPLETE_MISSION(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({
    fleetId: asNumber(postBody.api_deck_id),
    result: missionResult(body.api_clear_result),
    map: {
      area: body.api_maparea_name,
      name: body.api_quest_name,
      level: body.api_quest_level
    },
    rewards: List.of(body.api_get_item1, body.api_get_item2).map(getObjectOrDefault).map(parseReward),
    materials: asRecord(parseMaterialArray(body.api_get_material)),
    ships: List(body.api_ship_id.slice[1]),
    // experience: collectShipExperience(body.api_ship_id.slice[1], body.api_get_exp_lvup)
  });
}

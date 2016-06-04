/**
 * @overview
 *  Handler for the `COMPLETE_MISSION` event
 *
 * @since 0.1.0
 */
import { List, Map } from 'immutable';
import { parseMaterialArray, asRecord } from '../../transformers/api/materials';
import { asNumber, getObjectOrDefault } from '../../transformers/primitive';
import { Enum } from '../../helpers';

const missionResult = Enum({
  FAILURE: 0,
  SUCCESS: 1,
  HUGE_SUCCESS: 2
});

const parseReward = ({ api_useitem_id, api_useitem_count }) => Map({
  id: api_useitem_id,
  amount: api_useitem_count
});

export default function COMPLETE_MISSION({ body, postBody }) {
  return {
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
  };
}

/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { createGameActionHandler } from './_action-handler';
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

const COMPLETE_MISSION = ({ body, postBody }) => ({
  fleetId: asNumber(postBody.api_deck_id),
  result: missionResult(body.api_clear_result),
  map: {
    area: body.api_maparea_name,
    name: body.api_quest_name,
    level: body.api_quest_level
  },
  rewards: [body.api_get_item1, body.api_get_item2].map(getObjectOrDefault).map(parseReward),
  materials: parseMaterialArray(body.api_get_material),
  ships: body.api_ship_id.slice[1],
  // experience: collectShipExperience(body.api_ship_id.slice[1], body.api_get_exp_lvup)
});

export default createGameActionHandler(COMPLETE_MISSION);

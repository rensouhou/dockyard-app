/* eslint quote-props: 0, no-console: 0 */
/**
 * @overview
 * @since 0.1.0
 * @deprecated
 */
import R from 'ramda';
import { createAction } from 'redux-actions';
import { Map, Seq, Record } from 'immutable';
import * as ApiTransformers from './kcsapi';

const transformers = Map(ApiTransformers);
const transformersSeq = Seq.Keyed(ApiTransformers);

export const ApiEventsByPath = Map({
  'api_start2': 'INITIALIZE_GAME',  // ok
  'api_port/port': 'GET_BASE_DATA', // ok
  'api_req_mission/start': 'START_MISSION', // ok
  'mission/result': 'COMPLETE_MISSION', // ok
  'req_mission/return_instruction': 'QUIT_MISSION', // ok
  'kuosyou/destroyship': 'SCRAP_SHIP', // ok
  'hokyu/charge': 'RESUPPLY_SHIP',
  'req_kousyou/createitem': 'CRAFT_ITEM', // ok
  'req_kousyou/createship': 'CRAFT_SHIP', // ok
  'req_kousyou/destroyship': 'DESTROY_SHIP', // ok
  'req_kousyou/destroyitem2': 'DESTROY_ITEM', // ok
  'req_kousyou/getship': 'GET_SHIP', // ok
  'req_kaisou/powerup': 'MODERNIZE_SHIP',
  'req_kaisou/lock': 'LOCK_EQUIPMENT',
  'req_hensei/change': 'CHANGE_SHIP',
  'req_quest/start': 'START_QUEST', // ok
  'quest/clearitemget': 'COMPLETE_QUEST', // ok
  'req_quest/stop': 'STOP_QUEST', // ok
  'req_map/start': 'START_SORTIE', // ok
  'req_map/next': 'NEXT_SORTIE_NODE', // ok
  'req_sortie/battleresult': 'FINISHED_SORTIE', // ok
  'req_sortie/battle': 'SORTIE_STAGE', // ok
  'req_nyukyo/start': 'START_REPAIR', // ok
  'req_member/get_practice_enemyinfo': 'GET_OPPONENT_INFO', // ok
  'req_member/payitemuse': 'USE_PAID_ITEM',
  'req_practice/battle': 'START_PVP_BATTLE', // ok
  'req_practice/midnight_battle': 'START_PVP_MIDNIGHT_BATTLE', // ok
  'req_practice/battle_result': 'FINISHED_PRACTICE', // ok
  'req_hensei/combined': 'FLEET_COMBINED', // ok
  '/api_req_hensei/preset_select': 'LOAD_FLEET_PRESET', // ok
  'req_combined_battle/battle_water': 'COMBINED_BATTLE_WATER_PHASE', // ok
  'get_member/require_info': 'GET_PLAYER_BASE_DATA', // ok
  'get_member/sortie_conditions': 'GET_SORTIE_CONDITIONS',
  'get_member/ship_deck': 'GET_FLEET', // ok
  'get_member/deck': 'GET_FLEET_DATA', // ok
  'get_member/basic': 'GET_PROFILE_DATA',
  'get_member/furniture': 'GET_FURNITURE',
  'get_member/slotitem': 'GET_SLOT_ITEMS', // ok
  'get_member/useitem': 'GET_USABLE_ITEMS',
  'get_member/ndock': 'GET_REPAIR_DOCKS',
  'get_member/kdock': 'GET_CONSTRUCTION_DOCKS',
  'get_member/material': 'GET_MATERIAL', // ok
  'get_member/questlist': 'GET_QUEST_LIST', // ok
  'get_member/mission': 'GET_MISSION_LIST', // ok
  'get_member/practice': 'GET_PVP_OPPONENT_LIST', // ok
  'get_member/payitem': 'GET_PAID_ITEMS',
  'get_member/slot_item': 'GET_SLOT_ITEMS',
  'get_member/record': 'GET_PLAYER_RECORD'
});

export const ApiEvents = {
  INITIALIZE_GAME: 'INITIALIZE_GAME',
  GET_PLAYER_BASE_DATA: 'GET_PLAYER_BASE_DATA',
  GET_PROFILE_DATA: 'GET_PROFILE_DATA',
  GET_FURNITURE: 'GET_FURNITURE',
  GET_BASE_DATA: 'GET_BASE_DATA',
  GET_MATERIAL: 'GET_MATERIAL',
  GET_USABLE_ITEMS: 'GET_USABLE_ITEMS',
  GET_FLEET_DATA: 'GET_FLEET_DATA',
  GET_FLEET: 'GET_FLEET',
  GET_SLOT_ITEMS: 'GET_SLOT_ITEMS',
  USE_ITEM: 'USE_ITEM',
  DESTROY_ITEM: 'DESTROY_ITEM',
  LOCK_EQUIPMENT: 'LOCK_EQUIPMENT',

  // Ship-related
  GET_CONSTRUCTION_DOCKS: 'GET_CONSTRUCTION_DOCKS',
  CRAFT_SHIP: 'CRAFT_SHIP',
  CHANGE_SHIP: 'CHANGE_SHIP',
  RESUPPLY_SHIP: 'RESUPPLY_SHIP',
  SCRAP_SHIP: 'SCRAP_SHIP',
  REMODEL_SHIP: 'REMODEL_SHIP',
  MODERNIZE_SHIP: 'MODERNIZE_SHIP',

  // Equipment
  CRAFT_ITEM: 'CRAFT_ITEM',

  // Fleet-related (and combined)
  FLEET_COMBINED: 'FLEET_COMBINED',
  COMBINED_BATTLE_WATER_PHASE: 'COMBINED_BATTLE_WATER_PHASE',
  LOAD_FLEET_PRESET: 'LOAD_FLEET_PRESET',

  // Quests
  GET_QUEST_LIST: 'GET_QUEST_LIST',
  START_QUEST: 'START_QUEST',
  STOP_QUEST: 'STOP_QUEST',
  COMPLETE_QUEST: 'COMPLETE_QUEST',

  // Expeditions/missions
  GET_MISSION_LIST: 'GET_MISSION_LIST',
  START_MISSION: 'START_MISSION',
  QUIT_MISSION: 'QUIT_MISSION',
  COMPLETE_MISSION: 'COMPLETE_MISSION',

  // PVP/Practice
  GET_OPPONENT_INFO: 'GET_OPPONENT_INFO',
  GET_PVP_OPPONENT_LIST: 'GET_PVP_OPPONENT_LIST',
  START_PVP_BATTLE: 'START_PVP_BATTLE',
  START_PVP_NIGHT_BATTLE: 'START_PVP_NIGHT_BATTLE',
  FINISHED_PRACTICE: 'FINISHED_PRACTICE',

  // Sorties
  START_SORTIE: 'START_SORTIE',
  FINISHED_SORTIE: 'FINISHED_SORTIE',

  // Items
  USE_PAID_ITEM: 'USE_PAID_ITEM'
};

export const RECEIVED_API_DATA:string = 'RECEIVED_API_DATA';
export const PARSED_API_DATA:string = 'PARSED_API_DATA';

const wrapTransformer = (k, v) => R.wrap(v, (fn, action) => {
  console.group('k =>', k);
  console.log('fn => %O', fn);
  console.log('action => %O', action);
  console.groupEnd();
  return fn(action);
});

// @todo(@stuf): fix me properly pls
export const createTransformerActions = () => transformers.toKeyedSeq()
                                                          .mapEntries(([k, v]) => [k, createAction(k, v)])
                                                          .toJS();

export const prepareTransformerActions = transformersSeq.flatMap((fn, k) => Map.of(k, createAction(k, fn)));

export const createGameActions = () => ({
  parseApiData: createAction(RECEIVED_API_DATA, (data) => {
    const event = ApiEventsByPath.find((v:string, k:string) => data.path.includes(k));

    if (!transformers.has(event)) {
      console.warn(`No handler for event ${event}`);
    }
    else {
      return transformers.get(event)(data);
    }
  })
});

const GameStatesRec = Record({
  UNINITIALIZED: 'UNINITIALIZED',
  STARTING_GAME: 'STARTING_GAME',
  IN_SORTIE: 'IN_SORTIE',
  IN_PRACTICE: 'IN_PRACTICE',
  IDLE: 'IDLE',
  FINISHED_PRACTICE: 'FINISHED_PRACTICE',
  BROWSING_MISSIONS: 'BROWSING_MISSIONS',
  MISSION_STARTED: 'MISSION_STARTED'
});

export const GameStates = new GameStatesRec();

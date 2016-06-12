/**
 * @overview
 *  API handlers
 *
 * @since 0.1.0
 */
// region # Imports: Base Game Data
import INITIALIZE_GAME from './initialize-game';
import GET_BASE_DATA from './get-base-data';
import GET_PLAYER_BASE_DATA from './get-player-base-data';
import GET_CONSTRUCTION_DOCKS from './get-construction-docks';
import LOAD_FLEET_PRESET from './load-fleet-preset';
import GET_FLEET from './get-fleet';
import GET_MATERIAL from './get-material';
import GET_SLOT_ITEMS from './get-slot-items';
import START_MISSION from './start-mission';
import COMPLETE_MISSION from './complete-mission';
import GET_QUEST_LIST from './get-quest-list';
import START_QUEST from './start-quest';
import STOP_QUEST from './stop-quest';
import COMPLETE_QUEST from './complete-quest';
import CRAFT_ITEM from './craft-item';
import CRAFT_SHIP from './craft-ship';
import DESTROY_ITEM from './destroy-item';
import DESTROY_SHIP from './destroy-ship';
import GET_OPPONENT_INFO from './get-opponent-info';
import START_PVP_BATTLE from './start-pvp-battle';
import FINISHED_PRACTICE from './finished-practice';
import RESUPPLY_SHIP from './resupply-ship';
import START_SORTIE from './start-sortie';
import FINISHED_SORTIE from './finished-sortie';
// endregion
// region # Imports: Missions
// endregion
// region # Imports: Quests
// endregion
// region # Imports: Construction
// endregion
// region # Imports: Practice
// endregion
// region # Imports: Sortie
// endregion

export {
  INITIALIZE_GAME,
  GET_PLAYER_BASE_DATA,
  GET_CONSTRUCTION_DOCKS,
  GET_SLOT_ITEMS,
  GET_MATERIAL,
  GET_BASE_DATA,
  START_MISSION,
  COMPLETE_MISSION,
  CRAFT_ITEM,
  CRAFT_SHIP,
  DESTROY_ITEM,
  DESTROY_SHIP,
  LOAD_FLEET_PRESET,
  GET_FLEET,

  GET_QUEST_LIST,
  START_QUEST,
  STOP_QUEST,
  COMPLETE_QUEST,

  GET_OPPONENT_INFO,
  START_PVP_BATTLE,
  FINISHED_PRACTICE,

  RESUPPLY_SHIP,
  START_SORTIE,
  FINISHED_SORTIE
};


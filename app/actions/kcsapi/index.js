const transformers = {
  COMPLETE_MISSION: require('./complete-mission'),
  COMPLETE_QUEST: require('./complete-quest'),
  CRAFT_ITEM: require('./craft-item'),
  CRAFT_SHIP: require('./craft-ship'),
  DESTROY_ITEM: require('./destroy-item'),
  DESTROY_SHIP: require('./destroy-ship'),
  FINISHED_PRACTICE: require('./finished-practice'),
  FINISHED_SORTIE: require('./finished-sortie'),
  GET_BASE_DATA: require('./get-base-data'),
  GET_CONSTRUCTION_DOCKS: require('./get-construction-docks'),
  GET_FLEET: require('./get-fleet'),
  GET_MATERIAL: require('./get-material'),
  GET_QUEST_LIST: require('./get-quest-list'),
  GET_OPPONENT_INFO: require('./get-opponent-info'),
  GET_PLAYER_BASE_DATA: require('./get-player-base-data'),
  GET_SLOT_ITEMS: require('./get-slot-items'),
  LOAD_FLEET_PRESET: require('./load-fleet-preset'),
  INITIALIZE_GAME: require('./initialize-game'),
  RESUPPLY_SHIP: require('./resupply-ship'),
  START_MISSION: require('./start-mission'),
  START_PVP_BATTLE: require('./start-pvp-battle'),
  START_QUEST: require('./start-quest'),
  START_SORTIE: require('./start-sortie')
};

export default transformers;

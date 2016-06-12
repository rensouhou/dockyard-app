/**
 * @overview
 *  Application record definitions
 *
 * @since 0.1.0
 */
import { Map, List, Set, Record } from 'immutable';
import { ConstructionType } from './constants';

// region # Fleet
export const Fleet = Record({
  flagship: undefined,
  id: undefined,
  memberId: undefined,
  mission: [],
  name: '',
  ships: []
});
// endregion

// region # Material record
export const Materials = Record({
  fuel: 0,
  ammo: 0,
  steel: 0,
  bauxite: 0,
  instantConstruction: undefined,
  instantRepair: undefined,
  developmentMaterials: undefined,
  improvementMaterials: undefined
});
// endregion

// region # PlayerProfile record
export const PlayerProfile = Record({
  nickname: '',
  level: undefined,
  rank: undefined,
  limits: Map({
    maxShips: undefined,
    maxSlotItems: undefined,
    maxFurniture: undefined
  }),
  flags: Map({}),
  coins: undefined,
  medals: undefined,
  comment: undefined,
  furniture: undefined,
  fleetCount: undefined,
  missions: Map({}),
  practice: Map({}),
  sorties: Map({}),
  docks: Map({}),
  startTime: undefined,
  tutorial: Map({})
});
// endregion

// region # Ship record
/**
 * Ship record
 * @type {*|Record.Class}
 */
export const Ship = Record({
  id: undefined,
  sortId: undefined,
  shipId: undefined,
  level: undefined,
  experience: undefined,
  morale: undefined,
  stars: 0,
  fuel: 0,
  ammo: 0,
  hp: undefined,
  name: {
    kanji: '',
    reading: ''
  },
  stats: {
    firepower: undefined,
    torpedo: undefined,
    endurance: undefined,
    antiAir: undefined,
    luck: undefined,
    range: undefined,
    speed: undefined
  },
  repair: undefined,
  flags: {
    inRepairDock: false,
    onExpedition: false
  },
  rarity: undefined,
  gains: {
    scrap: undefined,
    modernize: undefined
  },
  remodel: {
    level: undefined,
    remodelsToId: undefined
  },
  type: undefined,
  slot: Map({
    count: undefined,
    capacity: List(),
    items: List()
  })
});
// endregion

// region # SlotItem record
/**
 * Slot item record
 * @type {*|Record.Class}
 */
export const SlotItem = Record({
  id: undefined,
  slotItemId: undefined,
  sortId: undefined,
  type: {
    broadCategory: undefined,
    category: undefined,
    iconId: undefined,
    itemInfoType: undefined
  },
  name: '',
  flavorText: '',
  level: undefined,
  airplaneLevel: undefined,
  gains: {
    scrap: undefined
  },
  rarity: undefined,
  locked: undefined,
  stats: undefined,
});
// endregion

// region # Dock record
export const Dock = Record({
  id: undefined,
  completionTime: undefined,
  shipId: undefined,
  materials: undefined,
  state: undefined
});
// endregion

// region # Quest record
export const Quest = Record({
  id: undefined,
  type: undefined,
  category: undefined,
  state: undefined,
  title: undefined,
  detail: undefined,
  reward: new Materials(),
  progress: undefined
});
// endregion record

// region # CraftedEntity default values
const craftedEntityDefault = {
  type: ConstructionType.NONE,
  entity: {
    baseId: undefined,
    playerId: undefined
  },
  valid: undefined,
  inProgress: undefined,
  dockId: undefined,
  completionTime: undefined,
  consumed: {
    materials: new Materials()
  },
  flags: {
    wasSuccessful: undefined,
    usedDevelopmentMaterials: undefined,
    instant: undefined,
    lsc: undefined
  }
};
// endregion

// region # CraftedEntity record definition
/**
 * @typedef {any} CreatedEntityRecord
 * @extends {Record.Class}
 */
export class CraftedEntityRecord extends Record(craftedEntityDefault) {
  /**
   * @returns {boolean}
   */
  isInProgress() {
    return !!this.inProgress;
  }

  isValid() {
    switch (this.type) {
      case ConstructionType.ITEM:
        return true;
      case ConstructionType.SHIP:
        return !this.isInProgress();
      default:
        return false;
    }
  }
}
// endregion

export const Player = {
  Fleet,
  Materials,
  PlayerProfile,
  CraftedEntityRecord
};

// Internal
// --------
const ApplicationState = Record({
  /**
   * @description
   *  `gameState` is the "state" of the SWF game itself, deduced from
   *  the kind of API events are received;
   * @example ApiEvents.INITIALIZE_GAME -> GameState.STARTING_GAME
   * @example ApiEvents.START_SORTIE    -> GameState.IN_SORTIE
   */
  gameState: '',
  /**
   * @description
   *  `appState` is the internal Dockyard application's state
   */
  appState: '',
  /**
   * @description
   *  A reference to the `<webview />` element that holds the game SWF
   */
  webview: undefined,
  /**
   * @description
   *  The result of the last taken screenshot (during this session)
   */
  lastScreenshot: Map(),
  isAudioMuted: false
});

const ApiHandler = Record({
  path: undefined,
  event: undefined,
  handler: undefined,
  flags: Set()
});

const ApiAction = Record({
  body: {},
  postBody: {},
  path: '',
  error: undefined
});

const KCSApiData = Record({
  api_data: undefined
});

export const Internal = { ApplicationState, ApiHandler, ApiAction, KCSApiData };

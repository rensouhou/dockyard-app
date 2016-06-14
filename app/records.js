/* eslint max-len: 0 */
/**
 * @overview
 *  Application record definitions
 *
 * @since 0.1.0
 */
import { Map, List, Set, Record } from 'immutable';
import { ConstructionType, ShipHealthState } from './constants';

// region # Fleet
/**
 * @type {FleetRecord}
 */
export const Fleet = Record({
  flagship: undefined,
  id: undefined,
  memberId: undefined,
  mission: List(),
  name: '',
  ships: List()
});
// endregion

// region # Material record
/**
 * A record that hold's the player's current state of usable materials.
 * @typedef {*|Record.Class} MaterialStateRecord
 */
export const MaterialState = Record({
  fuel: undefined,
  ammo: undefined,
  steel: undefined,
  bauxite: undefined,
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
export const shipRecordDefault = Record({
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

/**
 * Ship record
 * @type {ShipRecord}
 * @extends {BaseRecord}
 */
export class Ship extends Record(shipRecordDefault) {
  /**
   * Check if ship is an enemy
   * @returns {boolean}
   */
  isEnemy() {
    return false;
  }

  /**
   * Check if ship's health is critical
   * @returns {boolean}
   */
  isCritical() {
    return this.getHealthColor() === ShipHealthState.RED;
  }

  /**
   * The current health state of the ship
   * @returns {string}
   */
  getHealthColor() {
    return ShipHealthState.GREEN;
  }
}
// endregion

// region # SlotItem record
/**
 * Slot item record
 * @type {SlotItemRecord}
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
/**
 * @type {DockRecord}
 */
export const Dock = Record({
  id: undefined,
  completionTime: undefined,
  shipId: undefined,
  materials: undefined,
  state: undefined
});
// endregion

// region # Quest record
/**
 * @type {QuestRecord}
 */
export const Quest = Record({
  id: undefined,
  type: undefined,
  category: undefined,
  state: undefined,
  title: undefined,
  detail: undefined,
  reward: new MaterialState(),
  progress: undefined
});
// endregion record

// region # CraftedEntity
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
    materials: new MaterialState()
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
// endregion
/**
 * @type {CreatedEntityRecord}
 * @extends {BaseRecord}
 */
export class CraftedEntityRecord extends Record(craftedEntityDefault) {
  /**
   * @returns {boolean}
   */
  isInProgress() {
    return !!this.inProgress;
  }

  /**
   * Check if the crafted entity is valid.
   * @returns {boolean}
   */
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
  MaterialState,
  PlayerProfile,
  CraftedEntityRecord
};

// Internal
// --------
/** @type {ApplicationStateRecord} */
const ApplicationState = Record({
  gameState: '',
  appState: '',
  webview: undefined,
  lastScreenshot: Map(),
  isAudioMuted: false
});

/** @type {ApiHandlerRecord} */
const ApiHandler = Record({
  path: undefined,
  event: undefined,
  handler: undefined,
  flags: Set()
});

/** @type {ApiActionRecord} */
const ApiAction = Record({
  body: {},
  postBody: {},
  path: '',
  error: undefined
});

const KCSApiData = Record({
  api_data: undefined
});

/**
 * Internal application state records.
 * @type {{ApplicationState: ApplicationStateRecord, ApiHandler: ApiHandlerRecord, ApiAction: ApiActionRecord, KCSApiData: (*|Record.Class)}}
 */
export const Internal = { ApplicationState, ApiHandler, ApiAction, KCSApiData };

/**
 * @overview
 *
 * @since 0.1.0
 */
import { Map, List, Set, Record } from 'immutable';

export const Fleet = Record({
  flagship: undefined,
  id: undefined,
  memberId: undefined,
  mission: [],
  name: '',
  ships: []
});

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

export const Player = {
  Fleet,
  Materials,
  PlayerProfile
};

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
  flags: undefined,
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
  slot: {
    count: undefined,
    capacity: List(),
    items: List()
  }
});

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

export const Dock = Record({
  id: undefined,
  completionTime: undefined,
  shipId: undefined,
  materials: undefined,
  state: undefined
});

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
  lastScreenshot: Map()
});

const ApiHandler = Record({
  path: undefined,
  event: undefined,
  handler: undefined,
  flags: Set()
});

export const Internal = { ApplicationState, ApiHandler };

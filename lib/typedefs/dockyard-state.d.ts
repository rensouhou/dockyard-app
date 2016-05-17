/**
 * @overview
 *  Dockyard application state specification.
 *
 *  Use this as the single source of truth in everything related to
 *  the application state of the Dockyard app.
 *
 *  Every top-level interface can be found as a reducer with the
 *  same name in `/app/reducers`.
 *
 *  These definitions can also be used as JSDoc/ESDoc type signatures
 *  for functions and variables handling with these.
 */
export module DockyardState {
  // Base game data
  interface game {
    ships: Object[];
    shipTypes: Object[];
    slotItems: Object[];
    maps: Object[];
    mapAreas: Object[];
    mapCells: Object[];
    missions: Object[];
    bgm: Object[];
  }

  // Application internals
  interface application {
    gameState: string;
    appState: string;
    webview: HTMLElement;
    lastScreenshot?: {
      successful: boolean;
      filename: string;
    };
  }

  // Player data
  interface player {
    profile: any;
    quests: any;
    fleets: any;
    ships: any;
    slotItems: any;
    docks: any;
    materials: any;

    /** @see {@link DockyardState.mission} */
    missions: void;
  }

  // Crafting-related
  interface crafting {
    flags?: {
      [key: string]: any;
    };
    consumed: {
      recipe: any;
    };
  }

  // Expeditions
  interface mission {
  }

  interface practice {
    opponents: Array<any>;
  }

  interface quest {
    quests: Array<any>;
  }

  interface result {
    reward: any;
    rank: any;
    rest: any;
  }

  interface ships {}
}

namespace BaseData {
  export interface Map {
    id: number;
    name: string;
    type: number;
    cells: MapCell;
  }

  export interface MapCell {
    id: number;
    mapId: number;
    mapAreaId: number;
    mapInfoId: number;
    cellId: number;
    cellType: CellType;
  }

  export interface Mission {
    id: number;
    mapAreaId: number;
    name: string;
    description: string;
    duration: number;
    difficulty: any;
    consumption: {
      fuel: number;
      ammo: number;
    };
    rewards: {}[];
    interruptable: boolean;
  }

  export enum CellType {
    StartingPoint = 0,
    Exists = 1,
    Resources = 2,
    Whirlpool = 3,
    BattleNode = 4,
    BossNode = 5,
    ImaginationNode = 6,
    AirBattleNode = 7,
    EscortNode = 8,
    AirScoutNode = 9,
    BigAirBattle = 10
  }
}

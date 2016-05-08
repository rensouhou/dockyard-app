/**
 * Dockyard namespace
 */
namespace Dockyard {
  enum MissionState {
    Idle = 0,
    InProgress = 1,
    Returned = 2
  }

  /**
   * Non-personal base data
   */
  export module BaseData {
    interface Ship {
      shipId: number;
      sortId: number;
      flavorText: string;
      name: {
        kanji: string;
        reading?: string;
      };
      remodel: Remodel;
      fuel: number;  // Max capacity
      ammo: number;  // Max capacity
      rarity: Rarity;
      gains: {
        scrap: Materials;
        remodel: RemodelGains;
      };
      stats: ShipStats;
      slots: {
        count: number;
        capacity: [number, number, number, number, number];
      };
      type: ShipType;
      shipExtraVoices: boolean;
    }

    interface ShipType {
      id: number;
      sortId: number;
      name: string;
      equippableTypes: number;
      $_unknown: {
        kcnt: any;
        scnt: any;
      };
    }

    interface SlotItem {
      id: number;
      sortId: number;
      name: string;
      type: [number, number, number, number];
    }

    interface Remodel {
      level: number;
      remodelsToId: number;
      cost: {
        fuel: number;
        ammo: number;
      };
    }

    interface ShipStats {
      firepower: [number, number];
      torpedo: [number, number];
      endurance: [number, number];
      antiAir: [number, number];
      luck: [number, number];
      range: number;
      speed: number;
    }
    
    enum Rarity { 1, 2, 3, 4, 5 }
  }

  export module PlayerData {
    enum Stars { 1, 2, 3, 4, 5 }

    interface Ship {
      hp: [number, number]; // [now, max]
      fuel: number;  // Current fuel, merge with baseship when presenting
      ammo: number;  // Current ammo, merge with baseship when presenting
      stars: Stars;
    }
    interface ShipType {
    }
    interface SlotItem {
    }
    interface Profile {
    }
    interface Fleet {
      id: number;
      memberId: number;
      flagship: any;
      missionState: MissionState;
      ships: Array<number>;
      $_unknown: {
        nameId: any;
      };
    }

    interface Dock {
      id: number;
    }

    interface RepairDock extends Dock {
    }

    interface ConstructionDock extends Dock {
    }

    interface Profile {
    }

    interface Materials {
      fuel: number;
      ammo: number;
      steel: number;
      bauxite: number;
    }

    interface Mission {
      missionId: number;
      state: any;
      completionTime: number;
      fleetId: number;
      $_unknown: {
        last?: any;
      }
    }
  }

  export module API {
    interface ApiAction {
      type: string;
      payload: Object;
    }

    interface StartMission extends ApiAction {
      payload: {
        completion: number;
        fleetId: number;
        missionId: number;
      };
    }

    interface CompleteMission extends ApiAction {
      payload: {};
    }

    interface GetSlotItems extends ApiAction {
      
    }

    interface GetBaseData extends ApiAction {

    }
    
    /** @event GET_QUEST_LIST */
    interface GetQuestList {
      questCount: number;
      currentPage: number;
      totalPageCount: number;
      list: Array<any>;
      $_unknown: {
        execCount: any;
        execType: any;
      };
    }

    /** @event GET_MATERIAL */
    interface GetMaterial extends Materials {}

    /** @event GET_SORTIE_CONDITIONS */
    interface GetSortieConditions {
      win: number;
      lose: number;
      rate: number;
    }

    /** @event CRAFT_SHIP */
    interface CraftShip {
      dockId: number;
      flags: {
        instant: boolean;
        lcs: boolean;
      };
      consumed: {
        recipe: any;
      };
    }

    /** @event CRAFT_ITEM */
    interface CraftItem {
      flags: {
        successful: boolean;
      };
      consumed: {
        recipe: any;
        developmentMaterials: number;
      };
      slotItem?: any;
      materials: Materials;
    }
  }

  export module Quests {
    interface Quest {
      id: number;
      type: QuestType;
      category: QuestCategory;
      state: QuestState;
      progress: QuestProgress;
      title: number;
      detail: number;
      reward: Materials;
    }

    enum QuestType { 0, 1, 2, 3 }

    // @todo(@stuf): recheck if these are valid
    enum QuestCategory {
      1 = Composition,
      2 = Sortie,
      3 = Practice,
      4 = Mission,
      5 = RepairResupply,
      6 = Construction,
      7 = Improvisation,
      8 = Sortie2,
      9 = Other
    }

    enum QuestProgress {
      0 = Zero,
      1 = Fifty,
      2 = Eighty
    }
    enum QuestState {
      1 = Idle,
      2 = InProgress,
      3 = Done
    }
  }

  export interface Profile {
    id: number;
    name: string;
  }

  export interface Events extends Immutable.Map {
    [key: string]: any;
  }

  export interface ApiEventsByPath extends Immutable.Map {
    [key: string]: string;
  }

  export interface ApiRequest {
    path: string;
    status: __PROTO.Status;
    body?: any;
    postBody?: any;
  }

  export interface Materials {
    fuel: number;
    ammo: number;
    steel: number;
    bauxite: number;
    instantConstruction?: number;
    instantRepair?: number;
    developmentMaterials?: number;
    improvementMaterials?: number;
  }

  export interface RemodelGains {
    torpedo?: number;
    stat?: number;
    stat2?: number;
  }

  export interface PlayerMission {
    missionId: number;
    state: any;
    completionTime: number;
    fleetId: number;
    $_unknown: {
      $_last?: any;
    }
  }
}

namespace __PROTO {
  enum Status {
    OK,
    ERROR
  }

  export interface ApiRequest {
    path: string;
    error?: any;
    body?: any;
    postBody?: any;
  }

  export interface ApiRequestResponse {
    [key: string]: any;
  }

  /**
   * Application internal state shape
   */
  export interface AppState {
    /** Core state */
    core: {};

    /** Current game state */
    gameState: string;
    appState: string;

    app: {
      sorting: {
        shipSortBy: string; // current ship sorting
        slotItemSortBy: string; // current slotitem sorting
      };
    };

    /** Game-related base data */
    game: {
      ships: Array<Dockyard.BaseData.Ship>
      shipTypes: Array<Dockyard.BaseData.ShipType>;
      slotItems: Array<Dockyard.BaseData.SlotItem>;
      slotItemTypes: Array<any>;
    };

    /** PVP */
    practice: {
      opponents: {};
    };

    /** Combat results */
    result: {};

    /** Quests */
    quest: {
      count: number;
      currentPage: number;
      totalPageCount: number;
      quests: {[id: number]: Dockyard.Quests.Quest};
      $_unknown: {
        execCount: any;
        execType: any;
      };
    };

    /** The player's personalized stuff */
    player: {
      id: number;
      profile: Dockyard.PlayerData.Profile;
      fleets: Array<Dockyard.PlayerData.Fleet>;
      missions: Array<Dockyard.PlayerData.Mission>;
      docks: {
        repairDocks: Array<Dockyard.PlayerData.RepairDock>;
        constructionDocks: Array<Dockyard.PlayerData.ConstructionDock>;
      };
      ships: Array<Dockyard.PlayerData.Ship>;
      slotItems: Array<Dockyard.PlayerData.SlotItem>;
      materials: Dockyard.PlayerData.Materials;
    };
  }
}

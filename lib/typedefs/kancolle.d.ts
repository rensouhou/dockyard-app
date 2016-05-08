/**
 * Models
 *
 * Table of Contents
 *
 * Models:
 *
 * - Construction Docks [DOCK]
 * - Base API Data [BDAT]
 *   - Ship [BSHP]
 *   - Slotitem [BSLT]
 *   - Mission [BMIS]
 */
namespace KCS {
  export module Models {
    /** @label [DOCK] */
    interface ConstructionDock {
      api_member_id: number;
      api_id: number;
      api_state: ConstructionDockState;
      api_created_ship_id: number;
      api_complete_time: number;
      api_complete_time_str: string;
      api_item1: number;
      api_item2: number;
      api_item3: number;
      api_item4: number;
      api_item5: number;
    }

    /** @label [BDAT] */
    /** @label [BSHP] */
    interface BaseShip {
      api_id: number;
    }

    /** @label [BSLT] */
    interface BaseSlotItem {
      api_id: number;
    }

    /** @label [BMIS] */
    interface BaseMission {
      api_id: number;
      api_maparea_id: number;
      api_name: string;
      api_details: string;
      api_difficulty: number;
      api_return_flag: number;
      api_time: number;
      api_use_bull: number;
      api_use_fuel: number;
      api_win_item1: [number, number];
      api_win_item2?: [number, number];
    }

    interface PlayerShip {
      api_backs: number;
      api_bull: number;
      api_cond: number;
      api_exp: Array<number>;
      api_fuel: number;
      api_id: number;
      api_kaihi: [number, number];
      api_karyoku: [number, number];
      api_kyouka: Array<number>;
      api_leng: number;
      api_locked: number;
      api_locked_equip: number;
      api_lucky: [number, number];
      api_lv: number;
      api_maxhp: number;
      api_ndock_item: [number, number];
      api_ndock_time: number;
      api_nowhp: number;
      api_onslot: Array<number>;
      api_raisou: [number, number];
      api_sakuteki: [number, number];
      api_ship_id: number;
      api_slot: Array<number>;
      api_slot_ex: number;
      api_slotnum: number;
      api_sortno: number;
      api_soukou: [number, number];
      api_srate: number;
      api_taiku: [number, number];
      api_taisen: [number, number];
    }

    interface PlayerProfile {
      api_active_flag: number;
      api_comment?: string;
      api_comment_id?: string;
      api_count_deck: number;
      api_count_kdock: number;
      api_count_ndock: number;
      api_experience: number;
      api_fcoin: number;
      api_firstflag: number;
      api_furniture: Array<number>;
      api_large_dock: number;
      api_level: number;
      api_max_chara: number;
      api_max_kagu: number;
      api_max_slotitem: number;
      api_medals: number;
      api_member_id: number;
      api_ms_count: number;
      api_ms_success: number;
      api_nickname: string;
      api_nickname_id: number;
      api_playtime: number;
      api_pt_challenged: number;
      api_pt_challenged_win: number;
      api_pt_lose: number;
      api_pt_win: number;
      api_pvp: Array<number>;
      api_rank: number;
      api_st_lose: number;
      api_st_win: number;
      api_starttime: number;
      api_tutorial: number;
      api_tutorial_progress: number;
    }

    interface Fleet {
      api_flagship: string;
      api_id: number;
      api_member_id: number;
      api_mission: Array<number>;
      api_name: string;
      api_name_id: string;
      api_ship: Array<number>;
    }

    interface Log {
      api_message: string;
      api_no: number;
      api_state: string;
      api_type: string;
    }

    interface Furniture {
    }

    interface Material {
      api_id: MaterialType;
      api_member_id: number;
      api_value: number;
    }

    interface Quest {
      api_no: number;
      api_category: QuestCategory;
      api_detail: string;
      api_get_material: Array<number>;
      api_progress_flag: QuestProgress;
      api_state: QuestState;
      api_title: string;
      api_type: QuestType;
      api_invalid_flag: number;
    }

    enum QuestProgress {
      0, 1, 2
    }

    enum QuestCategory {
      3 = PracticeDaily
    }

    enum QuestState {
      2 = InProgress
    }

    enum QuestType {
      2 = PracticeDaily
    }

    /** `kdock` */
    enum ConstructionDockState {
      Locked = -1,
      Empty = 0,
      UnderConstruction = 2,
      ConstructionComplete = 3
    }
  }

  export class SlotItem {
  }

  export class ConstructionDock {
  }

  export class RepairDock {
  }

  enum MaterialType {
    Fuel = 1,
    Ammo = 2,
    Steel = 3,
    Bauxite = 4
  }
}

/**
 * API stuff
 */
namespace KCSApi {
  import ApiRequest = require('./dockyard');

  export interface Response {
    api_data: any;
    api_result: number;
    api_result_msg: string;
  }

  /** Missions */
  enum MissionResult {
    Failure = 0,
    Success = 1,
    HugeSuccess = 2
  }

  /** `useitem` */
  enum UseItemCategory {
    Other = 0,
    Furniture = 6
  }
  enum UseItemType {
    Unavailable = 0,
    Available = 4
  }

  /**
   * API Method Calls
   */
  module API {
    import ConstructionDock = Dockyard.PlayerData.ConstructionDock;
    import SlotItem = Dockyard.PlayerData.SlotItem;

    export interface INITIALIZE_GAME extends ApiRequest {
      body: {
        api_mst_ship: Array<any>;
      }
    }

    export interface GET_BASE_DATA extends ApiRequest {
      body: {
        api_basic: KCS.Models.PlayerProfile;
        api_deck_port: Array<KCS.Models.Fleet>;
        api_log: Array<KCS.Models.Log>;
        api_material: Array<KCS.Models.Material>;
        api_ndock: any;
        api_p_bgm_id: number;
        api_parallel_quest_count: number;
        api_ship: Array<KCS.Models.PlayerShip>;
      }
    }

    export interface GET_SLOT_ITEMS extends ApiRequest {
      body: Array<{
        api_id: number;
        api_slotitem_id: number;
        api_locked: number;
        api_level: number;
        api_alv?: number;
      }>;
    }

    export interface GET_SORTIE_CONDITIONS extends ApiRequest {
      body: {
        api_war: {
          api_win: string;
          api_lose: number;
          api_rate: any;
        };
      };
    }

    export interface GET_MATERIAL extends ApiRequest {
      body: Array<{
        api_member_id: number;
        api_id: number;
        api_value: number;
      }>;
    }

    export interface GET_PLAYER_BASE_DATA extends ApiRequest {
      body: {
        api_items: Array<SlotItem>;
        api_kdock: Array<ConstructionDock>;
        api_unsetslot: Array<any>;
        api_useitem: Array<any>;
        api_furniture: Array<any>;
      }
    }

    export interface FINISHED_PRACTICE extends ApiRequest {
      body: {};
    }

    export interface START_REPAIR extends ApiRequest {
    }

    export interface CRAFT_SHIP extends ApiRequest {
      postBody: {
        api_kdock_id: number;
        api_highspeed: number;
        api_large_flag: number;
        api_item1: number;
        api_item2: number;
        api_item3: number;
        api_item4: number;
        api_item5: number;
      };
    }
    export interface CRAFT_ITEM extends ApiRequest {
      body: {
        api_create_flag: number;
        api_shizai_flag: number;
        api_fdata: $_unclear;
        api_slot_item: {
          api_id: number;
          api_slotitem_id: number;
        };
        api_material: $_unclear;
        api_type3: number;
        api_unsetslot: $_unclear;
      };
      postBody: {
        api_item1: number;
        api_item2: number;
        api_item3: number;
        api_item4: number;
      };
    }

    export interface RESUPPLY_SHIP extends ApiRequest {
      body: {
        api_material: Array<number>;
        api_ship: Array<any>;
        api_use_bou: number;
      };
      postBody: {
        api_id_items: string;
        api_kind: string;
        api_onslot: string;
      };
    }

    export interface GET_SHIP extends ApiRequest {
      body: {
        api_id: number;
        api_ship_id: number;
        api_kdock: number;
        api_ship: any;
        api_slotitem: Array<{
          api_id: number;
          api_slotitem_id: number;
        }>;
      };
    }
    export interface START_MISSION extends ApiRequest {
      body: {
        api_complatetime: number;
        api_complatetime_str: string;
      };
      postBody: {
        api_deck_id: number;
        api_mission_id: number;
        api_mission: any;
      };
    }
    export interface COMPLETE_MISSION extends ApiRequest {
      body: {
        api_ship_id: Array<number>;
        api_clear_result: MissionResult;
        api_detail: string;
        api_get_exp: number;
        api_get_exp_lvup: Array<[number, number]>;
        api_get_item1: {
          api_useitem_count: number;
          api_useitem_id: number;
        };
        api_get_item2: {
          api_useitem_count: number;
          api_useitem_id: number;
        };
        api_get_material: Array<number>;
        api_maparea_name: string;
        api_member_exp: number;
        api_member_lv: number;
        api_quest_level: number;
        api_quest_name: string;
        api_useitem_flag: [number, number];
      };
      postBody: {
        api_deck_id: number;
      };
    }

    export interface GET_CONSTRUCTION_DOCKS extends ApiRequest {
      body: Array<ConstructionDock>;
    }
    export interface GET_USABLE_ITEMS extends ApiRequest {
      body: Array<{
        api_member_id: number;
        api_id: number;
        api_value: number;
        api_usetype: UseItemType;
        api_category: UseItemCategory;
        api_name: string;
        api_description: string;
        api_price: number;
        api_count: number;
      }>;
    }
    export interface START_QUEST extends ApiRequest {
      postBody: {
        api_quest_id: number;
      };
    }
    export interface STOP_QUEST extends ApiRequest {
      postBody: {
        api_quest_id: number;
      }
    }
    export interface COMPLETE_QUEST extends ApiRequest {
      body: {
        api_material: Array<number>;
        api_bounus_count: number;
        api_bounus: Array<{
          api_type: number;
          api_count: number;
          api_item: {
            api_id: number;
            api_name: string;
            api_id_from: number;
            api_id_to: number;
            api_message: string;
          };
        }>;
      };
      postBody: {
        api_quest: any;
        api_quest_id: number;
      };
    }
    export interface GET_PLAYER_RECORD extends ApiRequest {
      body: {
        api_member_id: number;
        api_nickname: string;
        api_nickname_id: any;
        api_cmt: string;
        api_cmt_id: any;
        api_photo_url: any;
        api_level: number;
        api_rank: number;
        api_experience: [number, number];
        api_war: {
          api_win: number;
          api_lose: number;
          api_rate: number;
        };
        api_mission: {
          api_count: number;
          api_success: number;
          api_rate: number;
        };
        api_practice: {
          api_win: number;
          api_lose: number;
          api_rate: number;
        };
        api_friend: number;
        api_deck: any;
        api_kdoc: number;
        api_ndoc: number;
        api_ship: [number, number];
        api_slotitem: [number, number];
        api_furniture: number;
        api_large_dock: number;
        api_material_max: any;
      };
    }
  }
}

interface $_unclear {
}

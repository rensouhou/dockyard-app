/**
 * @overview
 *
 * @since 0.1.0
 */
import { asBool } from '../primitive';

/** Reward ship */
const getShip = o => ({
  id: o.api_ship_id,
  name: o.api_ship_name,
  type: o.api_ship_type,
  flavorText: o.api_ship_getmes
});

/** Reward item */
const getItem = o => ({
  id: o.api_useitem_id,
  name: o.api_useitem_name
});

/** Reward slot item */
const getSlotItem = (o) => ({
  id: o.api_slotitem_id
});

/**
 * @param o
 */
export const sortieResult = o => {
  const ei = o.api_enemy_info;
  const gs = o.api_get_ship;
  const gi = o.api_get_useitem;
  const gsi = o.api_get_slotitem;
  const [item, ship, slotItem, ...restFlags] = o.api_get_flag;

  const flags = {
    getItem: asBool(item),
    getShip: asBool(ship),
    getSlotItem: asBool(slotItem),
    remaining: restFlags.map(asBool)
  };

  return {
    firstClear: asBool(o.api_first_clear),
    rank: o.api_win_rank,
    map: {
      name: o.api_quest_name,
      difficulty: o.api_quest_level
    },
    flags: {
      itemReward: flags.getItem,
      shipReward: flags.getShip,
      remaining: flags.remaining
    },
    rewards: {
      NYI: true
    },
    sunken: {
      ships: o.api_dests,
      flag: o.api_destsf,
      playerShips: o.api_lost_flag
    },
    experience: {
      hq: o.api_get_exp,
      base: o.api_get_base_exp,
      ship: o.api_get_ship_exp,
      levelUp: o.api_get_exp_lvup
    },
    enemy: {
      level: ei.api_level,
      rank: ei.api_rank,
      fleetName: ei.api_deck_name
    }
  };
};

/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { fromJS } from 'immutable';
import { asBool, notEmpty } from '../primitive';

const { filter } = R;

const rejectEmpty = filter(id => notEmpty(id));

/**
 * @param {KCS.Models.PlayerShip} s
 * @returns {Dockyard.PlayerData.Ship}
 */
export const playerShip = (s) => fromJS({
  id: s.api_id,
  sortId: s.api_sortno,
  shipId: s.api_ship_id,
  level: s.api_lv,
  experience: s.api_exp,
  morale: s.api_cond,
  stars: s.api_stars,
  slot: {
    count: s.api_slotnum,
    items: rejectEmpty(s.api_slot)
  },
  fuel: s.api_fuel,
  ammo: s.api_bull,
  hp: [s.api_nowhp, s.api_maxhp],
  stats: {
    evasion: s.api_kaihi,
    torpedo: {
      withEquip: s.api_raisou
    },
    endurance: {
      withEquip: s.api_taik
    },
    antiAir: {
      withEquip: s.api_taiku
    },
    antiSub: s.api_taisen,
    armor: {
      base: s.api_souk,
      withEquip: s.api_soukou
    },
    los: {
      base: s.api_saku,
      withEquip: s.api_sakuteki
    }
  },
  repair: {
    cost: (([fuel, steel]) => ({ fuel, steel }))(s.api_ndock_item),
    time: s.api_ndock_time
  },
  flags: {
    isLocked: asBool(s.api_locked),
    isSlotItemLocked: asBool(s.api_locked_equip)
  }
});

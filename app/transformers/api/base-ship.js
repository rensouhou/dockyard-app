/**
 * @overview
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { asNumber, formatLineBreaks } from '../primitive';
import { parseMaterialArray, asRecord } from './materials';

/**
 * @type {function}
 * @param {Object} s
 * @returns {ShipRecord}
 * @todo(@stuf): create methods to check if a ship is player/enemy
 */
export const baseShip = (s) => fromJS({
  shipId: asNumber(s.api_id),
  sortId: asNumber(s.api_sortno),
  flavorText: formatLineBreaks(s.api_getmes),
  name: {
    kanji: s.api_name,
    reading: s.api_yomi
  },
  stats: {
    firepower: {
      base: s.api_houg
    },
    torpedo: {
      base: s.api_raig
    },
    endurance: {
      base: s.api_taik
    },
    antiAir: {
      base: s.api_tyku
    },
    luck: {
      base: s.api_luck
    },
    range: s.api_leng,
    speed: s.api_soku
  },
  rarity: s.api_backs,
  gains: {
    scrap: asRecord(parseMaterialArray(s.api_broken)),
    modernize: s.api_powup
  },
  slot: {
    count: s.api_slot_num,
    capacity: s.api_maxeq
  },
  type: s.api_stype,
  shipExtraVoices: s.api_voicef,
  ammo: asNumber(s.api_bull_max),
  fuel: asNumber(s.api_fuel_max),
  remodel: {
    level: asNumber(s.api_afterlv),
    remodelsToId: asNumber(s.api_aftershipid)
  },
  buildTime: s.api_buildtime
});

/**
 * @type {function}
 * @param {{api_id: number, api_sortno: number, api_version: number}} o
 * @returns {object}
 */
export const baseShipGraphic = (o) => fromJS({
  id: asNumber(o.api_id),
  sortId: asNumber(o.api_sortno),
  filename: o.api_filename,
  version: o.api_version
});

/**
 * @type {Object}
 */
const typeName = {
  1: { ja: '海防艦	', en: 'Escort Ship' },
  2: { ja: '駆逐艦	', en: 'Destroyer' },
  3: { ja: '軽巡洋艦', en: 'Light Cruiser' },
  4: { ja: '重雷装巡洋艦', en: 'Torpedo Cruiser' },
  5: { ja: '重巡洋艦', en: 'Heavy Cruiser' },
  6: { ja: '航空巡洋艦', en: 'Aircraft Cruiser' },
  7: { ja: '軽空母', en: 'Light Aircraft Carrier' },
  8: { ja: '巡洋戦艦', en: 'Battleship (?)' },
  9: { ja: '戦艦', en: 'Battleship' },
  10: { ja: '航空戦艦', en: 'Aviation Battleship' },
  11: { ja: '正規空母', en: 'Aircraft Carrier' },
  12: { ja: '超弩級戦艦', en: 'Super Dreadnoughts' },
  13: { ja: '潜水艦', en: 'Submarine' },
  14: { ja: '潜水空母', en: 'Aircraft Carrying Submarine' },
  15: { ja: '補給艦 (敵のほう)' },
  16: { ja: '水上機母艦', en: 'Seaplane Carrier' },
  17: { ja: '揚陸艦', en: 'Amphibious Assault Ship' },
  18: { ja: '装甲空母', en: 'Aircraft Carrier' },
  19: { ja: '工作艦', en: 'Repair Ship' },
  20: { ja: '潜水母艦', en: 'Submarine Tender' },
  21: { ja: '練習巡洋艦', en: 'Training Cruiser' },
  22: { ja: '補給艦 (味方のほう)', en: 'Fleet Oiler' }
};

/**
 * @type {function}
 * @param {number} id
 * @param {Object} names
 * @returns {?string}
 */
const shipTypeName = (id, names = typeName) => names[id] || null;

/**
 * @type {function}
 * @param {{api_id: number, api_sortno: number, api_name: number}} o
 * @returns {Object}
 */
export const baseShipType = (o) => ({
  id: asNumber(o.api_id),
  sortId: asNumber(o.api_sortno),
  name: shipTypeName(o.api_name),
  slotCount: o.api_scnt,
  silhouette: o.api_kcnt,
  equipType: o.api_equip_type
});

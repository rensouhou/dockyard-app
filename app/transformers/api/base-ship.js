/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/base-ship
 */
import { asNumber, formatLineBreaks } from '../primitive';
import { parseMaterialArray } from './materials';

/**
 * @param {KCS.Models.BaseShip} s
 * @returns {Dockyard.BaseData.Ship}
 * @todo(@stuf): create methods to check if a ship is player/enemy
 */
export const baseShip = (s) => ({
  shipId: s.api_id,
  sortId: s.api_sortno,
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
    scrap: parseMaterialArray(s.api_broken),
    modernize: s.api_powup
  },
  slots: {
    count: s.api_slot_num,
    capacity: s.api_maxeq
  },
  type: s.api_stype,
  shipExtraVoices: s.api_voicef,
  ammo: s.api_bull_max,
  fuel: s.api_fuel_max,
  remodel: {
    level: s.api_afterlv,
    remodelsToId: asNumber(s.api_aftershipid)
  },
  buildTime: s.api_buildtime,
  $_finalized: false
});

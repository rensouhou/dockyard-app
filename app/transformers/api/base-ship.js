/**
 * @overview
 *
 * @since 0.1.0
 */
import { Ship } from '../../records';
import { asNumber, formatLineBreaks } from '../primitive';
import { parseMaterialArray, asRecord } from './materials';

/**
 * @param s
 * @returns {Ship}
 * @todo(@stuf): create methods to check if a ship is player/enemy
 */
export const baseShip = (s) => new Ship({
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

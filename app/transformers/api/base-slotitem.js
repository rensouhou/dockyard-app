/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Base model for the base slot-item data
 *
 * @since 0.3.0
 * @version 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/base-slotitem
 */
import { formatLineBreaks } from '../primitive';
import { parseMaterialArray } from '../api/materials';

/**
 * @param {KCS.Models.BaseSlotItem} o
 * @returns {Dockyard.BaseData.SlotItem}
 */
export const baseSlotItem = o => ({
  slotItemId: o.api_id,
  sortId: o.api_sortno,
  name: o.api_name,
  flavorText: formatLineBreaks(o.api_info),
  type: {
    broadCategory: o.api_type[0],
    itemInfoType: o.api_type[1],
    category: o.api_type[2],
    iconId: o.api_type[3]
  },
  stats: {
    endurance: o.api_taik,
    firepower: o.api_houg,
    antiAir: o.api_tyku,
    antiSub: o.api_tais,
    armor: o.api_souk,
    bombs: o.api_baku,
    hit: o.api_houm,
    torpedoHit: o.api_raim,
    evasion: o.api_houk,
    torpedoEvasion: o.api_raik,
    bombEvasion: o.api_bakk,
    search: o.api_saku,
    searchJamming: o.api_sakb,
    luck: o.api_luck,
    range: o.api_leng
  },
  rarity: o.api_rare,
  gains: {
    scrap: parseMaterialArray(o.api_broken)
  },
  $_finalized: false,
  $_unknown: {
    atap: o.api_atap
  },
  $_unclear: ['broadCategory', 'itemInfoType', 'armor', 'bombs', 'search', 'searchJamming']
});

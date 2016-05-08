/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/get-slot-items
 */
import { playerSlotItem } from '../../transformers/api/player-slotitem';

/**
 * @param {KCSApi.API.GET_SLOT_ITEMS} r
 * @returns {{r: *}}
 */
export default function action$getSlotItems(r) {
  return {
    slotItems: r.body.map(playerSlotItem)
  };
}

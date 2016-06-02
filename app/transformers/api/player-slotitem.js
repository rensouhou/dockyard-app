/**
 * @overview
 *
 * @since 0.1.0
 */
import { SlotItem } from '../../records';
import { asBool } from '../primitive';

/**
 * @param o
 */
export const playerSlotItem = o => new SlotItem({
  id: o.api_id,
  level: o.api_level,
  locked: asBool(o.api_locked),
  slotItemId: o.api_slotitem_id,
  airplaneLevel: o.api_alv
});


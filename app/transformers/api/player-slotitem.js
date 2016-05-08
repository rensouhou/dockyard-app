/**
 * @overview
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/player-slotitem
 */
import { asBool } from '../primitive';

/**
 * @param o
 */
export const playerSlotItem = o => ({
  id: o.api_id,
  level: o.api_level,
  locked: asBool(o.api_locked),
  slotItemId: o.api_slotitem_id,
  airplaneLevel: o.api_alv
});


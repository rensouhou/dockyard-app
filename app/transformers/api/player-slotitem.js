/**
 * @overview
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { asBool } from '../primitive';

export const playerSlotItem = (o) => fromJS({
  id: o.api_id,
  level: o.api_level,
  locked: asBool(o.api_locked),
  slotItemId: o.api_slotitem_id,
  airplaneLevel: o.api_alv
});


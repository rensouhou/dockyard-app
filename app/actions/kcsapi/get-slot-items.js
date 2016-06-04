/**
 * @overview
 *  Handler for `GET_SLOT_ITEMS` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { playerSlotItem } from '../../transformers/api/player-slotitem';

export default function GET_SLOT_ITEMS({ body }) {
  return Map({
    slotItems: body.map(playerSlotItem)
  });
}

/**
 * @overview
 *  Handler for `GET_SLOT_ITEMS` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { playerSlotItem } from '../../transformers/api/player-slotitem';

export default function GET_SLOT_ITEMS({ body }) {
  return fromJS({
    slotItems: body.map(playerSlotItem)
  });
}

/**
 * @overview
 *  Handler for `GET_SLOT_ITEMS` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { playerSlotItem } from '../../transformers/api/player-slotitem';

/**
 * Handler function for the `GET_SLOT_ITEMS` event.
 * @param {ApiActionRecord} p
 * @returns {any}
 * @constructor
 * @version 0.2.0
 */
export default function GET_SLOT_ITEMS(p) {
  const { body } = p;
  return fromJS({
    slotItems: body.map(playerSlotItem)
  });
}

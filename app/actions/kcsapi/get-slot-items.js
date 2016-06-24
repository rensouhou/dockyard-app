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
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function GET_SLOT_ITEMS(apiAction) {
  const { body } = apiAction;
  return fromJS({
    slotItems: body.map(playerSlotItem)
  });
}

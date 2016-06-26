/**
 * @overview
 *  Handler for `GET_PLAYER_BASE_DATA` event
 *
 * @since 0.1.0
 * @module app/actions/kcsapi/get-player-base-data
 */
import { List, Map, fromJS } from 'immutable';
import { playerSlotItem } from '../../transformers/api/player-slotitem';
import { constructionDock } from '../../transformers/api/construction-dock';

/**
 * Handler function for the `GET_PLAYER_BASE_DATA` event.
 *
 * @name GET_PLAYER_BASE_DATA
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function GET_PLAYER_BASE_DATA(apiAction) {
  const { body } = apiAction;
  return fromJS({
    slotItems: Map({
      items: List(body.api_slot_item).map(playerSlotItem),
      unused: Map(body.api_unsetslot),
      used: Map(body.api_useitem)
    }),
    constructionDocks: List(body.api_kdock).map(constructionDock),
    furniture: body.api_furniture
  });
}

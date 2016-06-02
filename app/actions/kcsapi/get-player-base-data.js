/**
 * @overview
 *  Handler for `GET_PLAYER_BASE_DATA` event
 *
 * @since 0.1.0
 */
import { List, Map } from 'immutable';
import { playerSlotItem } from '../../transformers/api/player-slotitem';
import { constructionDock } from '../../transformers/api/construction-dock';

export default function GET_PLAYER_BASE_DATA({ body }) {
  return {
    slotItems: {
      items: List(body.api_slot_item).map(playerSlotItem),
      unused: Map(body.api_unsetslot),
      used: Map(body.api_useitem)
    },
    constructionDocks: List(body.api_kdock).map(constructionDock),
    furniture: body.api_furniture
  };
}

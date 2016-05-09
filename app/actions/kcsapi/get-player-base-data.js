/**
 * @overview
 *  Handler for `GET_PLAYER_BASE_DATA` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { playerSlotItem } from '../../transformers/api/player-slotitem';
import { constructionDock } from '../../transformers/api/construction-dock';

export default function GET_PLAYER_BASE_DATA({ body }) {
  return {
    slotItems: {
      items: body.api_slot_item.map(playerSlotItem),
      unused: body.api_unsetslot,
      used: body.api_useitem
    },
    constructionDocks: body.api_kdock.map(constructionDock),
    furniture: body.api_furniture
  };
}

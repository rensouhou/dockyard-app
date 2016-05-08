/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `GET_PLAYER_BASE_DATA` event
 *
 * @since 0.3.0
 * @version 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/get-player-base-data
 */
import { playerSlotItem } from '../../transformers/api/player-slotitem';
import { constructionDock } from '../../transformers/api/construction-dock';

/**
 * @param {KCSApi.API.GET_PLAYER_BASE_DATA} r
 */
export default function action$getPlayerBaseData(r) {
  return {
    slotItems: {
      items: r.body.api_slot_item.map(playerSlotItem),
      unused: r.body.api_unsetslot,
      used: r.body.api_useitem
    },
    constructionDocks: r.body.api_kdock.map(constructionDock),
    furniture: r.body.api_furniture
  };
}

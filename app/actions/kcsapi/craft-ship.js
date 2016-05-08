/**
 * @overview
 *  Handler for `CRAFT_SHIP` event
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/craft-ship
 */
import { asBool, asNumber } from '../../transformers/primitive';
import { parseMaterialsRecipe } from '../../transformers/api/materials';

/**
 * @event CRAFT_SHIP
 * @param {KCSApi.API.CRAFT_SHIP} r
 * @returns {Dockyard.API.CraftShip}
 */
export default function action$craftShip(r) {
  const d = r.postBody;

  return {
    dockId: asNumber(d.api_kdock_id),
    flags: {
      instant: asBool(d.api_highspeed),
      lsc: asBool(d.api_large_flag)
    },
    consumed: {
      recipe: parseMaterialsRecipe([d.api_item1, d.api_item1, d.api_item3, d.api_item4, null, null, d.api_item5])
    }
  };
}

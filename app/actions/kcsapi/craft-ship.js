/**
 * @overview
 *  Handler for `CRAFT_SHIP` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { gameActionHandler } from './_action-handler';
import { asBool, asNumber } from '../../transformers/primitive';
import { parseMaterialsRecipe } from '../../transformers/api/materials';

const CRAFT_SHIP = ({ postBody }) => ({
  dockId: asNumber(postBody.api_kdock_id),
  flags: {
    instant: asBool(postBody.api_highspeed),
    lsc: asBool(postBody.api_large_flag)
  },
  consumed: {
    recipe: parseMaterialsRecipe([
      postBody.api_item1, postBody.api_item1, postBody.api_item3, postBody.api_item4, null, null, postBody.api_item5
    ])
  }
});

export default gameActionHandler(CRAFT_SHIP);

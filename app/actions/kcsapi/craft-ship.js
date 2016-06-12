/**
 * @overview
 *  Handler for `CRAFT_SHIP` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { asBool, asNumber } from '../../transformers/primitive';
import { parseMaterialsRecipe, asRecord } from '../../transformers/api/materials';
import { CraftedEntityRecord } from '../../records';

export default function CRAFT_SHIP({ postBody }) {
  return fromJS({
    craftedEntity: new CraftedEntityRecord({
      dockId: asNumber(postBody.api_kdock_id),
      consumed: {
        materials: asRecord(parseMaterialsRecipe([
          postBody.api_item1,
          postBody.api_item1,
          postBody.api_item3,
          postBody.api_item4, null, null,
          postBody.api_item5
        ]))
      },
      flags: {
        instant: asBool(postBody.api_highspeed),
        lsc: asBool(postBody.api_large_flag)
      }
    })
  });
}

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

/**
 * Handler function for the `CRAFT_SHIP` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function CRAFT_SHIP(apiAction) {
  const { postBody } = apiAction;
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

/**
 * @overview
 *  Handler for `CRAFT_ITEM` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { asBool } from '../../transformers/primitive';
import { parseMaterialsRecipe, parseMaterialArray, asRecord } from '../../transformers/api/materials';
import { ConstructionType } from '../../constants';
import { CraftedEntityRecord } from '../../records';

/**
 * @private
 * @type {function}
 * @param {Object} slotItem
 * @returns {Object}
 * @since 0.1.0
 */
const getSlotItem = (slotItem = {}) => ({
  playerId: slotItem.api_id,
  baseId: slotItem.api_slotitem_id
});

/**
 * Handler function for the `CRAFT_ITEM` event
 *
 * @name CRAFT_ITEM
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function CRAFT_ITEM(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({
    craftedEntity: new CraftedEntityRecord({
      type: ConstructionType.ITEM,
      entity: getSlotItem(body.api_slot_item),
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
        successful: asBool(body.api_create_flag),
        usedDevelopmentMaterials: asBool(body.api_shizai_flag),
      }
    }),
    player: {
      materials: asRecord(parseMaterialArray(body.api_material))
    }
  });
}

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
 * @param {Object} slotItem
 * @returns {Object}
 */
const getSlotItem = (slotItem = {}) => ({
  playerId: slotItem.api_id,
  baseId: slotItem.api_slotitem_id
});

/**
 * @param {Object} body
 * @param {Object} postBody
 * @returns {any}
 * @constructor
 */
export default function CRAFT_ITEM({ body, postBody }) {
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

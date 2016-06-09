/**
 * @overview
 *  Handler for `CRAFT_ITEM` event
 *
 * @since 0.1.0
 */
import { fromJS, List } from 'immutable';
import { asNumber, asBool } from '../../transformers/primitive';
import { parseMaterialsRecipe, parseMaterialArray, asRecord } from '../../transformers/api/materials';

const getSlotItem = (slotItem = {}) => ({
  id: slotItem.api_id,
  slotItemId: slotItem.api_slotitem_id
});

export default function CRAFT_ITEM({ body, postBody }) {
  return fromJS({
    flags: {
      successful: asBool(body.api_create_flag),
      usedDevelopmentMaterials: asBool(body.api_shizai_flag)
    },
    consumed: {
      materials: asRecord(parseMaterialsRecipe(List(postBody).map(asNumber)))
    },
    player: {
      materials: asRecord(parseMaterialArray(body.api_material))
    },
    slotItem: getSlotItem(body.api_slot_item)
  });
}

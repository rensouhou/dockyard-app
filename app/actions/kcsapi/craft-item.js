/**
 * @overview
 *  Handler for `CRAFT_ITEM` event
 *
 * @since 0.1.0
 */
import { fromJS, List } from 'immutable';
import { asNumber, asBool } from '../../transformers/primitive';
import { parseMaterialsRecipe, parseMaterialArray, asRecord } from '../../transformers/api/materials';
import { ConstructionType } from '../../constants';

const getSlotItem = (slotItem = {}) => ({
  playerId: slotItem.api_id,
  baseId: slotItem.api_slotitem_id
});

export default function CRAFT_ITEM({ body, postBody }) {
  return fromJS({
    type: ConstructionType.ITEM,
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
    entity: getSlotItem(body.api_slot_item)
  });
}

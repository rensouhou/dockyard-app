/**
 * @overview
 *  Handler for `CRAFT_ITEM` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import R from 'ramda';
import { createGameActionHandler } from './_action-handler';
import { asNumber, asBool } from '../../transformers/primitive';
import { parseMaterialsRecipe, parseMaterialArray } from '../../transformers/api/materials';

const CRAFT_ITEM = ({ body, postBody }) => ({
  flags: {
    successful: asBool(body.api_create_flag),
    usedDevelopmentMaterials: asBool(body.api_shizai_flag)
  },
  consumed: {
    recipe: parseMaterialsRecipe(R.map(asNumber, postBody))
  },
  materials: parseMaterialArray(body.api_material),
  // @todo(@stuf): replace with Maybe monad (`sanctuary`)
  slotItem: !R.is(Object, body.api_slot_item) ? null : {
    id: body.api_slot_item.api_id,
    slotItemId: body.api_slot_item.api_slotitem_id
  },
  $_finalized: false,
  $_unknown: {
    fdata: body.api_fdata
  }
});

export default createGameActionHandler(CRAFT_ITEM);

/**
 * @overview
 *  Handler for `DESTROY_ITEM` event
 *
 * @since 0.1.0
 */
import { parseMaterialArray } from '../../transformers/api/materials';

export default function ({ body }) {
  return {
    materials: parseMaterialArray(body.api_material)
  };
}

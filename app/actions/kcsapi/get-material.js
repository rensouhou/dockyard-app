/**
 * @overview
 *  Handler for `GET_MATERIAL` event
 *
 * @since 0.1.0
 */
import { parseMaterialObjects } from '../../transformers/api/materials';
import { getArrayOrDefault } from '../../transformers/primitive';

export default function GET_MATERIAL({ body }) {
  return {
    materials: parseMaterialObjects(getArrayOrDefault(body))
  };
}

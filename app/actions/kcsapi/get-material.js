/**
 * @overview
 *  Handler for `GET_MATERIAL` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { parseMaterialObjects } from '../../transformers/api/materials';
import { getArrayOrDefault } from '../../transformers/primitive';

export default function GET_MATERIAL({ body }) {
  return fromJS({
    materials: parseMaterialObjects(getArrayOrDefault(body))
  });
}

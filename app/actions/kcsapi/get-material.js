/**
 * @overview
 *  Handler for `GET_MATERIAL` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { parseMaterialObjects, asRecord } from '../../transformers/api/materials';
import { getArrayOrDefault } from '../../transformers/primitive';

export default function GET_MATERIAL({ body }) {
  return Map({
    materials: asRecord(parseMaterialObjects(getArrayOrDefault(body)))
  });
}

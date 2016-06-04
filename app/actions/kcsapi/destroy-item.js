/**
 * @overview
 *  Handler for `DESTROY_ITEM` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { parseMaterialArray, asRecord } from '../../transformers/api/materials';

export default function DESTROY_ITEM({ body }) {
  return Map({
    materials: asRecord(parseMaterialArray(body.api_material))
  });
}

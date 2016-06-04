/**
 * @overview
 *  Handler for `DESTROY_SHIP` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { parseMaterialArray, asRecord } from '../../transformers/api/materials';
import { asNumber } from '../../transformers/primitive';

export default function DESTROY_SHIP({ body, postBody }) {
  return Map({
    materials: asRecord(parseMaterialArray(body.api_material)),
    id: asNumber(postBody.api_ship_id)
  });
}

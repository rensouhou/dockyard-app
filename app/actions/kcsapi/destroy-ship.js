/**
 * @overview
 *  Handler for `DESTROY_SHIP` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { parseMaterialArray } from '../../transformers/api/materials';
import { asNumber } from '../../transformers/primitive';

export default function ({ body, postBody }) {
  return {
    materials: parseMaterialArray(body.api_material),
    id: asNumber(postBody.api_ship_id)
  }
};

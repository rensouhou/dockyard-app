/**
 * @overview
 *  Handler for the `RESUPPLY_SHIP` event.
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { fromJS } from 'immutable';
import { parseMaterialArray, asRecord } from '../../transformers/api/materials';

export default function RESUPPLY_SHIP({ body }) {
  return fromJS({
    materials: asRecord(parseMaterialArray(body.api_material))
  });
}

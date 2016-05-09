/**
 * @overview
 *  Handler for the `RESUPPLY_SHIP` event.
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { parseMaterialArray } from '../../transformers/api/materials';

export default function ({ body }) {
  return {
    materials: parseMaterialArray(body.api_material)
  };
}

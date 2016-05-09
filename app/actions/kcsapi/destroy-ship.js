/**
 * @overview
 *  Handler for `DESTROY_SHIP` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { gameActionHandler } from './_action-handler';
import { parseMaterialArray } from '../../transformers/api/materials';
import { asNumber } from '../../transformers/primitive';

const DESTROY_SHIP = r => ({
  materials: parseMaterialArray(r.body.api_material),
  id: asNumber(r.postBody.api_ship_id)
});

export default gameActionHandler(DESTROY_SHIP);

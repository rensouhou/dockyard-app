/**
 * @overview
 *  Handler for `DESTROY_ITEM` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { parseMaterialArray } from '../../transformers/api/materials';
import { gameActionHandler } from './_action-handler';

const DESTROY_ITEM = r => ({
  materials: parseMaterialArray(r.body.api_material)
});

export default gameActionHandler(DESTROY_ITEM, { verbose: true });

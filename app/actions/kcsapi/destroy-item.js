/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `DESTROY_ITEM` event
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/destroy-item
 */
import { parseMaterialArray } from '../../transformers/api/materials';

/**
 * @event DESTROY_ITEM
 * @param r
 * @returns {{materials: *}}
 */
export function action$destroyItem(r) {
  return {
    materials: parseMaterialArray(r.body.api_material)
  };
}

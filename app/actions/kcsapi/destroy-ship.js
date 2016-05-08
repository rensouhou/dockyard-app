/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `DESTROY_SHIP` event
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/destroy-ship
 */
import { parseMaterialArray } from '../../transformers/api/materials';
import { asNumber } from '../../transformers/primitive';

/**
 * @event DESTROY_SHIP
 * @param r
 * @returns {{materials: *, id: number}}
 */
export function action$destroyShip(r) {
  return {
    materials: parseMaterialArray(r.body.api_material),
    id: asNumber(r.postBody.api_ship_id)
  };
}

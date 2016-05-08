/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for the `RESUPPLY_SHIP` event.
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/resupply-ship
 */
import { parseMaterialArray } from '../../transformers/api/materials';

/**
 * @event RESUPPLY_SHIP
 * @param {KCSApi.API.RESUPPLY_SHIP} r
 */
export default function action$resupplyShip(r) {
  return {
    materials: parseMaterialArray(r.body.api_material)
  };
}

/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `GET_MATERIAL` event
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/get-material
 * @see {@link __PROTO.AppState}
 */
import { parseMaterialObjects } from '../../transformers/api/materials';
import { getArrayOrDefault } from '../../transformers/primitive';

/**
 * @event GET_MATERIAL
 * @param {__PROTO.ApiRequest} r
 * @returns {Dockyard.API.GetMaterial}
 */
export default function (r) {
  return {
    materials: parseMaterialObjects(getArrayOrDefault(r.body))
  };
}

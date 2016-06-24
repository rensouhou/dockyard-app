/**
 * @overview
 *  Handler for `DESTROY_SHIP` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { parseMaterialArray, asRecord } from '../../transformers/api/materials';
import { asNumber } from '../../transformers/primitive';

/**
 * Handler function for the `DESTROY_SHIP` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function DESTROY_SHIP(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({
    materials: asRecord(parseMaterialArray(body.api_material)),
    id: asNumber(postBody.api_ship_id)
  });
}

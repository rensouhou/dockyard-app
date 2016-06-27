/**
 * @overview
 *  Handler for the `RESUPPLY_SHIP` event.
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { fromJS } from 'immutable';
import { parseMaterialArray, asRecord } from '../../transformers/api/materials';

/**
 * @name RESUPPLY_SHIP
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.3.0
 */
export default function RESUPPLY_SHIP(apiAction) {
  const { body } = apiAction;
  return fromJS({
    materials: asRecord(parseMaterialArray(body.api_material))
  });
}

/**
 * @overview
 *  Handler for `DESTROY_ITEM` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { parseMaterialArray, asRecord } from '../../transformers/api/materials';

/**
 * Handler for the `DESTROY_ITEM` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function DESTROY_ITEM(apiAction) {
  const { body } = apiAction;
  return fromJS({
    materials: asRecord(parseMaterialArray(body.api_material))
  });
}

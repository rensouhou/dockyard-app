/**
 * @overview
 *  Handler for `GET_MATERIAL` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { parseMaterialObjects, asRecord } from '../../transformers/api/materials';
import { getArrayOrDefault } from '../../transformers/primitive';

/**
 * Handler function for the `GET_MATERIAL` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function GET_MATERIAL(apiAction) {
  const { body } = apiAction;
  return fromJS({
    materials: asRecord(parseMaterialObjects(getArrayOrDefault(body)))
  });
}

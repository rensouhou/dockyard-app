/**
 * @overview
 *
 * @since 0.2.0
 */
import { fromJS } from 'immutable';
import { nextMapCell } from '../../transformers/api/map';

/**
 * @name NEXT_SORTIE_NODE
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.2.0
 * @since 0.3.0
 */
export default function NEXT_SORTIE_NODE(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({
    next: nextMapCell(body)
  });
}

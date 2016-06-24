/**
 * @overview
 *  Handler for the `FINISHED_SORTIE` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { sortieResult } from '../../transformers/api/sortie-result';

/**
 * Handler function for the `FINISHED_SORTIE` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.1.0
 */
export default function FINISHED_SORTIE(apiAction) {
  const { body } = apiAction;
  return fromJS({
    result: sortieResult(body)
  });
}


/**
 * @overview
 *  Handler for `START_SORTIE` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';

/**
 * @name START_SORTIE
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 */
export default function START_SORTIE(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({ body, postBody });
}

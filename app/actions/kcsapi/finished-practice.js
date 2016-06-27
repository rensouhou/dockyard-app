/**
 * @overview
 *  Handler for `FINISHED_PRACTICE` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';

/**
 * Handler function for the `FINISHED_PRACTICE` event
 *
 * @name FINISHED_PRACTICE
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 */
export default function FINISHED_PRACTICE(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({
    body,
    postBody
  });
}

/**
 * @overview
 *  Handler for `START_PVP_BATTLE` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';

/**
 * Handler function for the `START_PVP_BATTLE` event
 *
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 * @todo Rename to fit into naming conventions (PVP = practice)
 */
export default function START_PVP_BATTLE(apiAction) {
  const { body, postBody } = apiAction;
  return fromJS({
    body,
    postBody
  });
}

/**
 * @overview
 *  Handler for `START_PVP_BATTLE` event
 *
 * @since 0.1.0
 * @todo Rename to fit into naming conventions (PVP = practice)
 */
import { Map } from 'immutable';

export default function START_PVP_BATTLE({ body, postBody }) {
  return Map({ body, postBody });
}

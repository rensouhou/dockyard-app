/**
 * @overview
 *  Handler for `START_SORTIE` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';

export default function START_SORTIE({ body, postBody }) {
  return Map({ body, postBody });
}

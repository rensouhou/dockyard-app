/**
 * @overview
 *  Handler for `FINISHED_PRACTICE` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';

export default function FINISHED_PRACTICE({ body, postBody }) {
  return Map({ body, postBody });
}

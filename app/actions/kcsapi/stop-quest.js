/**
 * @overview
 *
 * @since 0.2.0
 */
import { fromJS } from 'immutable';

export default function STOP_QUEST({ body, postBody }) {
  return fromJS({
    body,
    postBody
  });
}

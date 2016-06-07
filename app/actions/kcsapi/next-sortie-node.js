/**
 * @overview
 *
 * @since 0.2.0
 */
import { fromJS } from 'immutable';
import { nextMapCell } from '../../transformers/api/map';

export default function NEXT_SORTIE_NODE({ body, postBody }) {
  return fromJS({
    next: nextMapCell(body)
  });
}

/**
 * @overview
 *  Handler for `GET_SORTIE_CONDITIONS` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { asNumber } from '../../transformers/primitive';

export default function GET_SORTIE_CONDITIONS({ body }) {
  return Map({
    win: asNumber(body.api_win),
    lose: body.api_lose,
    rate: body.api_rate
  });
}

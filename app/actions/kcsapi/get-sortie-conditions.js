/**
 * @overview
 *  Handler for `GET_SORTIE_CONDITIONS` event
 *
 * @since 0.1.0
 */
import { asNumber } from '../../transformers/primitive';

export default function ({ body }) {
  return {
    win: asNumber(body.api_win),
    lose: body.api_lose,
    rate: body.api_rate,
    $_finalized: false
  };
}

/**
 * @overview
 *  Handler for `GET_SORTIE_CONDITIONS` event
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { asNumber } from '../../transformers/primitive';

/**
 * Handler function for the `GET_SORTIE_CONDITIONS` event.
 *
 * @param {ApiActionRecord} p
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function GET_SORTIE_CONDITIONS(p) {
  const { body } = p;
  return fromJS({
    win: asNumber(body.api_win),
    lose: body.api_lose,
    rate: body.api_rate
  });
}

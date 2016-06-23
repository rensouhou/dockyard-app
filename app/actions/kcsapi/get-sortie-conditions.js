/**
 * @overview
 *  Handler for `GET_SORTIE_CONDITIONS` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { asNumber } from '../../transformers/primitive';

/**
 * Handler function for the `GET_SORTIE_CONDITIONS` event.
 *
 * @param {ApiActionRecord} p
 * @returns {IMap<string, *>}
 * @constructor
 * @version 0.2.0
 */
export default function GET_SORTIE_CONDITIONS(p) {
  const { body } = p;
  return Map({
    win: asNumber(body.api_win),
    lose: body.api_lose,
    rate: body.api_rate
  });
}

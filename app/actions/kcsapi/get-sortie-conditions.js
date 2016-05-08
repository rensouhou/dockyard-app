/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `GET_SORTIE_CONDITIONS` event
 *
 * @since 0.3.0
 * @version 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/get-sortie-conditions
 */
import { asNumber } from '../../transformers/primitive';

/**
 * @event GET_SORTIE_CONDITIONS
 * @param {Dockyard.API.GetSortieConditions} r
 * @returns {__PROTO.ApiRequestResponse}
 */
export default function action$getSortieConditions(r) {
  return {
    win: asNumber(r.body.api_win),
    lose: r.body.api_lose,
    rate: r.body.api_rate,
    $_finalized: false
  };
}

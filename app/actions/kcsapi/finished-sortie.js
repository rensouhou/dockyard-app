/**
 * @overview
 *  Handler for the `FINISHED_SORTIE` event
 *
 * @since 0.3.0
 * @version 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/finished-sortie
 */
import { sortieResult } from '../../transformers/api/sortie-result';

/**
 * @event FINISHED_SORTIE
 * @param {__PROTO.ApiRequest} r
 */
export default function action$finishedSortie(r) {
  return {
    result: sortieResult(r.body)
  };
}

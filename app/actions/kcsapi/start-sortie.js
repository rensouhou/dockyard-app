/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `START_SORTIE` event
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/start-sortie
 */

/**
 * @event START_SORTIE
 * @param {__PROTO.ApiRequest} r
 */
export default function action$startSortie(r) {
  console.warn('action$startSortie NYI; event `START_SORTIE`');

  return {
    r,
    $_finalized: false,
    $_nyi: true
  };
}

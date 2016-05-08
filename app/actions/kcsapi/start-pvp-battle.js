/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `START_PVP_BATTLE` event
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/start-pvp-battle
 */

/**
 * @event START_PVP_BATTLE
 * @param r
 */
export default function action$startPvpBattle(r) {
  console.warn('action$startPvpBattle NYI; event `START_PVP_BATTLE`');
  return { r };
}

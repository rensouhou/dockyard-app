/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `START_MISSION` event
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/start-mission
 */

/**
 * @event START_MISSION
 * @param {KCSApi.API.START_MISSION} r
 */
export default function action$startMission(r) {
  return {
    completionTime: r.body.api_complatetime,
    fleetId: r.postBody.api_deck_id,
    missionId: r.postBody.api_mission_id
  };
}

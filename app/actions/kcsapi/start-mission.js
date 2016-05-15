/**
 * @overview
 *  Handler for `START_MISSION` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
export default function ({ body, postBody }) {
  return {
    targetTime: body.api_complatetime,
    fleetId: postBody.api_deck_id,
    missionId: postBody.api_mission_id
  };
}

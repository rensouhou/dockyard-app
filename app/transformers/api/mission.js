/**
 * @overview
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/mission
 * @flow
 */
type Mission = {
  state: number,
  missionId: number,
  completionTime: number
};

export const mission = ([state, missionId, completionTime]):Mission => ({ state, missionId, completionTime });

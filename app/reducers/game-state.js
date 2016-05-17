/* eslint no-multi-spaces: 0, no-unused-vars: 0 */
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/game-state
 */
import R from 'ramda';
import { ApiEvents, GameStates } from '../actions/game';
import createReducer from './create-reducer';

const GameStateMapping = [
  [ApiEvents.INITIALIZE_GAME, GameStates.STARTING_GAME],
  [ApiEvents.START_SORTIE, GameStates.IN_SORTIE],
  [ApiEvents.START_MISSION, GameStates.MISSION_STARTED],
  [ApiEvents.START_PVP_BATTLE, GameStates.IN_PRACTICE],
  [ApiEvents.GET_BASE_DATA, GameStates.IDLE],
  [ApiEvents.FINISHED_PRACTICE, GameStates.FINISHED_PRACTICE],
  [ApiEvents.GET_MISSION_LIST, GameStates.BROWSING_MISSIONS]
];

export default createReducer(GameStates.UNINITIALIZED,
  R.fromPairs(R.map(([apiEvent, fn]) => [apiEvent, () => fn], GameStateMapping)));

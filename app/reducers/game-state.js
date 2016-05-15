/* eslint no-multi-spaces: 0, no-unused-vars: 0 */
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/game-state
 */
import R from 'ramda';
import { ApiEvents, GameState } from '../actions/game';
import createReducer from './create-reducer';

const GameStateMapping = [
  [ApiEvents.INITIALIZE_GAME, GameState.STARTING_GAME],
  [ApiEvents.START_SORTIE, GameState.IN_SORTIE],
  [ApiEvents.START_MISSION, GameState.MISSION_STARTED],
  [ApiEvents.START_PVP_BATTLE, GameState.IN_PRACTICE],
  [ApiEvents.GET_BASE_DATA, GameState.IDLE],
  [ApiEvents.FINISHED_PRACTICE, GameState.FINISHED_PRACTICE],
  [ApiEvents.GET_MISSION_LIST, GameState.BROWSING_MISSIONS]
];

export default createReducer(GameState.UNINITIALIZED,
  R.fromPairs(R.map(([apiEvent, fn]) => [apiEvent, () => fn], GameStateMapping)));

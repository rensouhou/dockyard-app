/**
 * @overview
 *
 * @since 0.1.0
 */
import createReducer from './create-reducer';
import { Internal } from '../records';
import { ApiEvents, GameStates } from '../actions/game';
import { REGISTER_GAME_VIEW } from '../actions/application';

const initialState = new Internal.ApplicationState();

/**
 * @param {Immutable.Map} state
 * @param actionType
 * @param gameStates
 */
const updatedState = (state, actionType, gameStates) =>
  state.set('gameState', gameStates.get(actionType));

/**
 * Reducer for `ApplicationState.application`
 */
export default createReducer(initialState, {
  [REGISTER_GAME_VIEW](state, { payload }) {
    return state.set('webview', payload);
  },
  [ApiEvents.INITIALIZE_GAME](state, { type }) {
    return updatedState(state, type, GameStates);
  },
  [ApiEvents.START_SORTIE](state, { type }) {
    return updatedState(state, type, GameStates);
  },
  [ApiEvents.START_PVP_BATTLE](state, { type }) {
    return updatedState(state, type, GameStates);
  },
  [ApiEvents.GET_BASE_DATA](state, { type }) {
    return updatedState(state, type, GameStates);
  },
  [ApiEvents.FINISHED_PRACTICE](state, { type }) {
    return updatedState(state, type, GameStates);
  },
  [ApiEvents.GET_MISSION_LIST](state, { type }) {
    return updatedState(state, type, GameStates);
  }
});

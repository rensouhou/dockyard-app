/**
 * @overview
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import createReducer from './create-reducer';
import { Internal } from '../records';
import { ApiEvents, GameStates, ApplicationEvents } from '../constants';
const { REGISTER_GAME_VIEW, TOGGLE_AUDIO } = ApplicationEvents;

const gameStateMapping = Map({
  [ApiEvents.INITIALIZE_GAME]: GameStates.STARTING_GAME,
  [ApiEvents.START_SORTIE]: GameStates.IN_SORTIE,
  [ApiEvents.START_MISSION]: GameStates.MISSION_STARTED,
  [ApiEvents.START_PVP_BATTLE]: GameStates.IN_PRACTICE,
  [ApiEvents.GET_BASE_DATA]: GameStates.IDLE,
  [ApiEvents.FINISHED_PRACTICE]: GameStates.FINISHED_PRACTICE,
  [ApiEvents.GET_MISSION_LIST]: GameStates.BROWSING_MISSIONS
});

const initialState = new Internal.ApplicationState();

/**
 * @param {!Map<string, *>} state
 * @param {!string} actionType
 */
const updatedState = (state, actionType) =>
  state.set('gameState', gameStateMapping.get(actionType));

/**
 * Reducer for `ApplicationState.application`
 */
export default createReducer(initialState, {
  [TOGGLE_AUDIO](state, { payload }) {
    return state;
  },
  [REGISTER_GAME_VIEW](state, { payload }) {
    return state.set('webview', payload);
  },
  [ApiEvents.INITIALIZE_GAME](state, { type }) {
    return updatedState(state, type);
  },
  [ApiEvents.START_SORTIE](state, { type }) {
    return updatedState(state, type);
  },
  [ApiEvents.START_PVP_BATTLE](state, { type }) {
    return updatedState(state, type);
  },
  [ApiEvents.GET_BASE_DATA](state, { type }) {
    return updatedState(state, type);
  },
  [ApiEvents.FINISHED_PRACTICE](state, { type }) {
    return updatedState(state, type);
  },
  [ApiEvents.GET_MISSION_LIST](state, { type }) {
    return updatedState(state, type);
  }
});

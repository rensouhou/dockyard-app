/**
 * @overview
 *
 * @since 0.1.0
 */
import createReducer from './create-reducer';
import { ApiEvents, GameStates } from '../actions/game';
import { REGISTER_GAME_VIEW } from '../actions/application';

const initialState = {
  /**
   * @description
   *  `gameState` is the "state" of the SWF game itself, deduced from
   *  the kind of API events are received;
   * @example ApiEvents.INITIALIZE_GAME -> GameState.STARTING_GAME
   * @example ApiEvents.START_SORTIE    -> GameState.IN_SORTIE
   */
  gameState: null,

  /**
   * @description
   *  `appState` is the internal Dockyard application's state
   */
  appState: null,

  /**
   * @description
   *  A reference to the `<webview />` element that holds the game SWF
   */
  webview: null,

  /**
   * @description
   *  The result of the last taken screenshot (during this session)
   */
  lastScreenshot: {
    error: null,
    successful: null,
    filename: null
  }
};

/**
 * @param event
 * @param gameStates
 */
const getGameState = (event, gameStates) => gameStates[event];

/**
 * @param state
 * @param action
 * @param gameStates
 */
const getState = (state, action, gameStates) => ({
  ...state,
  gameState: getGameState(action.type, gameStates)
});

export default createReducer(initialState, {
  [REGISTER_GAME_VIEW](state, action) {
    return {
      ...state,
      webview: action.payload
    };
  },
  [ApiEvents.INITIALIZE_GAME](state, action) {
    return {
      ...getState(state, action, GameStates)
    };
  },
  [ApiEvents.START_SORTIE](state, action) {
    return {
      ...getState(state, action, GameStates)
    };
  },
  [ApiEvents.START_PVP_BATTLE](state, action) {
    return {
      ...getState(state, action, GameStates)
    };
  },
  [ApiEvents.GET_BASE_DATA](state, action) {
    return {
      ...getState(state, action, GameStates)
    };
  },
  [ApiEvents.FINISHED_PRACTICE](state, action) {
    return {
      ...getState(state, action, GameStates)
    };
  },
  [ApiEvents.GET_MISSION_LIST](state, action) {
    return {
      ...getState(state, action, GameStates)
    };
  }
});

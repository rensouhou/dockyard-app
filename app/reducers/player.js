/**
 * @overview
 *
 * @since 0.1.0
 */
import { List, Map } from 'immutable';
import { ApiEvents } from '../actions/game';
import createReducer from './create-reducer';
import { PlayerProfile, Materials as MaterialState } from '../records';

const initialState = Map({
  profile: new PlayerProfile(),
  quests: List(),
  fleets: List(),
  ships: List(),
  slotItems: List(),
  missions: List(),
  docks: {
    repair: List(),
    construction: List()
  },
  materials: new MaterialState()
});

const logReducer = (state, action) => {
  console.groupCollapsed('Action of type %s', action.type);
  console.log('state  =>', state);
  console.log('action =>', action);
  console.groupEnd();
};

export default createReducer(initialState, {
  [ApiEvents.GET_PLAYER_BASE_DATA](state, { payload }) {
    logReducer(state, { payload });
    return state.set('slotItems', payload.slotItems.items);
  },
  [ApiEvents.GET_BASE_DATA](state, { payload }) {
    logReducer(state, { payload });
    return state.merge(payload);
  },
  [ApiEvents.GET_FLEET](state, { payload }) {
    logReducer(state, { payload });
    const fleets = state.get('fleets');
    return state.set(
      'fleets',
      fleets.set(payload.fleetId - 1, payload.fleet)
    );
  },
  [ApiEvents.LOAD_FLEET_PRESET](state, { payload }) {
    logReducer(state, { payload });
    const fleets = state.get('fleets');
    return state.set(
      'fleets',
      fleets.set(payload.fleetId - 1, payload.fleet)
    );
  },
  [ApiEvents.GET_MATERIAL](state, { payload }) {
    logReducer(state, { payload });
    return state.set(
      'materials',
      state.get('materials').merge(payload.materials)
    );
  },
  [ApiEvents.RESUPPLY_SHIP](state, { payload }) {
    logReducer(state, { payload });
    return state.set(
      'materials',
      state.get('materials').merge(payload.materials)
    );
  },
  [ApiEvents.GET_CONSTRUCTION_DOCKS](state, action) {
    logReducer(state, action);
    return { ...state };
  }
});

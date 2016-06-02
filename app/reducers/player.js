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
  console.group('Action of type %s', action.type);
  console.log('state  =>', state);
  console.log('action =>', action);
  console.groupEnd();
};

export default createReducer(initialState, {
  [ApiEvents.GET_PLAYER_BASE_DATA](state, action) {
    logReducer(state, action);
    return state.set('slotItems', action.payload.slotItems.items);
  },
  [ApiEvents.GET_BASE_DATA](state, action) {
    logReducer(state, action);
    return state.merge(action.payload);
  },
  [ApiEvents.GET_FLEET](state, action) {
    logReducer(state, action);
    return state.set(
      'fleets',
      state.get('fleets').set(action.payload.fleetId - 1, action.payload.fleet)
    );
  },
  [ApiEvents.LOAD_FLEET_PRESET](state, action) {
    logReducer(state, action);
    return state.set(
      'fleets',
      state.get('fleets').set(action.payload.fleetId - 1, action.payload.fleet)
    );
  },
  [ApiEvents.GET_MATERIAL](state, action) {
    logReducer(state, action);
    const materials = state.get('materials');
    console.log('materials ->', materials);
    return state.set(
      'materials',
      materials.merge(action.payload)
    );
  },
  [ApiEvents.RESUPPLY_SHIP](state, action) {
    logReducer(state, action);
    const materials = state.get('materials');
    console.log('materials ->', materials);
    return state.set(
      'materials',
      materials.merge(action.payload)
    );
  },
  [ApiEvents.GET_CONSTRUCTION_DOCKS](state, action) {
    logReducer(state, action);
    return { ...state };
  }
});

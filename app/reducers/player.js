/**
 * @overview
 *
 * @since 0.1.0
 */
import { List, Set, Map } from 'immutable';
import R from 'ramda';
import { ApiEvents } from '../actions/game';
import createReducer from './create-reducer';
import { PlayerProfile, Materials as MaterialState } from '../records';

const immutableInitialState = Map({
  profile: new PlayerProfile(),
  quests: List(),
  fleets: List(),
  ships: Set(),
  slotItems: Set(),
  missions: List(),
  docks: {
    repair: List(),
    construction: List()
  },
  materials: new MaterialState()
});

const initialState = {
  profile: new PlayerProfile(),
  quests: {},
  fleets: [],
  ships: [],
  slotItems: [],
  missions: [],
  docks: {
    repairDocks: [],
    constructionDocks: []
  },
  materials: new MaterialState()
};

const mergeProfile = (k, l, r) => {
  switch (k) {
    case 'profile':
    case 'materials':
      return R.merge(l, r);
    case 'ships':
    case 'fleets':
    case 'slotItems':
      return r;
    default:
      return r;
  }
};

const updateFleet = (state, payload) => ({
  ...state,
  fleets: R.update(
    R.propEq('id', payload.fleetId), state.fleets,
    payload.fleet,
    state.fleets
  )
});

const updateBaseData = (data, state) => R.mergeWithKey(mergeProfile, state, data);
const updateKey = (key, data, state) => R.assoc(key, { ...data }, state);

export default createReducer(initialState, {
  [ApiEvents.GET_PLAYER_BASE_DATA](state, action) {
    return updateKey('slotItems', action.payload.slotItems.items, state);
  },
  [ApiEvents.GET_BASE_DATA](state, action) {
    return updateBaseData(action.payload, state);
  },
  [ApiEvents.GET_FLEET](state, action) {
    const fleets = state.fleets;
    fleets[action.payload.fleetId - 1] = action.payload.fleet;

    return {
      ...state, fleets
    };
  },
  [ApiEvents.LOAD_FLEET_PRESET](state, action) {
    const fleets = state.fleets;
    fleets[action.payload.fleetId - 1] = action.payload.fleet;

    return {
      ...state, fleets
    };
  },
  [ApiEvents.GET_MATERIAL](state, action) {
    return {
      ...state,
      materials: {
        ...state.materials,
        ...action.payload.materials
      }
    };
  },
  [ApiEvents.RESUPPLY_SHIP](state, action) {
    return {
      ...state,
      materials: {
        ...state.materials,
        ...action.payload.materials
      }
    };
  },
  [ApiEvents.GET_CONSTRUCTION_DOCKS](state, action) {
    return { ...state };
  }
});

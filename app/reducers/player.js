/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/player
 */
import R from 'ramda';
import { ApiEvents } from '../actions/game';
import createReducer from './create-reducer';

const _ = R.__;

const initialState = {
  profile: {
    limits: {
      maxShips: 0,
      maxSlotItems: 0,
      maxFurniture: 0
    },
    level: 0
  },
  quests: {},
  fleets: [],
  ships: [],
  slotItems: [],
  missions: [],
  docks: {
    repairDocks: [],
    constructionDocks: []
  },
  materials: {}
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
    console.log('get player base data', state, action);
    return updateKey('slotItems', action.payload.slotItems.items, state);
  },
  [ApiEvents.GET_BASE_DATA](state, action) {
    return updateBaseData(action.payload, state);
  },
  [ApiEvents.GET_FLEET](state, action) {
    let fleets = state.fleets;
    fleets[action.payload.fleetId - 1] = action.payload.fleet;

    return {
      ...state,
      fleets: fleets
    };
  },
  [ApiEvents.LOAD_FLEET_PRESET](state, action) {
    let fleets = state.fleets;
    fleets[action.payload.fleetId - 1] = action.payload.fleet;

    return {
      ...state,
      fleets: fleets
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
  [ApiEvents.GET_CONSTRUCTION_DOCKS](state, action) {
    return { ...state };
  }
});

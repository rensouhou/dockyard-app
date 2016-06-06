/* eslint no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import { List, Map, fromJS } from 'immutable';
import { ApiEvents } from '../constants';
import createReducer from './create-reducer';
import { PlayerProfile, Materials as MaterialState } from '../records';

const initialState = fromJS({
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

export default createReducer(initialState, {
  [ApiEvents.GET_PLAYER_BASE_DATA](state, { payload }) {
    return state.set('slotItems', payload.getIn(['slotItems', 'items']));
  },
  [ApiEvents.GET_BASE_DATA](state, { payload }) {
    return state.merge(payload);
  },
  [ApiEvents.GET_FLEET](state, { payload }) {
    return state.setIn(['fleets', payload.get('fleetId') - 1], payload.get('fleet'));
  },
  [ApiEvents.LOAD_FLEET_PRESET](state, { payload }) {
    return state.setIn(['fleets', payload.get('fleetId') - 1], payload.get('fleet'));
  },
  [ApiEvents.GET_MATERIAL](state, { payload }) {
    return state.mergeDeepWith((prev, next) => next == null ? prev : next, payload);
  },
  [ApiEvents.RESUPPLY_SHIP](state, { payload }) {
    return state.mergeDeepWith((prev, next) => next == null ? prev : next, payload);
  },
  [ApiEvents.GET_CONSTRUCTION_DOCKS](state, { payload }) {
    return Map.of(...state);
  }
});

/**
 * @overview
 * @since 0.3.0
 */
import { List, fromJS } from 'immutable';
import { ApiEvents } from '../constants';
import createReducer from './create-reducer';
import { FleetRecord, ProfileRecord } from '../records';

/**
 * @private
 * @readonly
 * @type {OpponentReducerState}
 */
const initialState = fromJS({
  opponent: {
    profile: new ProfileRecord(),
    fleet: new FleetRecord()
  },
  history: {
    0: {
      profile: new ProfileRecord(),
      fleets: []
    }
  }
});

export default createReducer(initialState, {
  [ApiEvents.GET_PVP_OPPONENT_LIST](state, { payload }) {
    return state;
  },
  [ApiEvents.GET_OPPONENT_INFO](state, { payload }) {
    const playerId = payload.getIn(['profile', 'id']);
    const profilePath = ['history', playerId, 'profile'];
    const fleetPath = ['history', playerId, 'fleets'];
    const playerFleets = state.getIn(fleetPath, List());

    return state.mergeIn(profilePath, payload.get('profile'))
                .mergeIn(fleetPath, playerFleets.concat(payload.get('fleet')));
  }
});

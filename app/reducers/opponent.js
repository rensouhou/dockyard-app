/**
 * @overview
 * @since 0.3.0
 */
import { fromJS } from 'immutable';
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
  opponentHistory: {},
  opponentFleets: {
    0: []
  }
});

export default createReducer(initialState, {
  [ApiEvents.GET_PVP_OPPONENT_LIST](state, { payload }) {
    return state;
  },
  [ApiEvents.GET_OPPONENT_INFO](state, { payload }) {
    return state.mergeIn(['opponentHistory', payload.getIn(['profile', 'id'])], payload.get('profile'))
                .mergeIn(['opponentFleets', payload.getIn(['profile', 'id'])], payload.get('fleet'));
  }
});

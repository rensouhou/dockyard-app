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
  opponents: [],
  opponent: {
    profile: new ProfileRecord(),
    fleet: new FleetRecord()
  }
});

export default createReducer(initialState, {
  [ApiEvents.GET_PVP_OPPONENT_LIST](state, { payload }) {
    return state.mergeIn(['opponent'], payload);
  },
  [ApiEvents.GET_OPPONENT_INFO](state, { payload }) {
    return state;
  }
});

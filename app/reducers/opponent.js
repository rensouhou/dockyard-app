/**
 * @overview
 * @since 0.3.0
 */
import { List, fromJS } from 'immutable';
import { ApiEvents } from '../constants';
import createReducer from './create-reducer';

/**
 * @private
 * @readonly
 * @type {OpponentReducerState}
 */
const initialState = fromJS({
  profile: {},
  fleet: {}
});

export default createReducer(initialState, {
  [ApiEvents.GET_PVP_OPPONENT_LIST](state, { payload }) {
    return state;
  },
  [ApiEvents.GET_OPPONENT_INFO](state, { payload }) {
    return state.merge(payload);
  }
});

export { initialState as _initialState };

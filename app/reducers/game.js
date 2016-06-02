/**
 * @overview
 *
 * @since 0.1.0
 */
import { Map, List } from 'immutable';
import { ApiEvents } from '../actions/game';
import createReducer from './create-reducer';

const initialState = Map({
  ships: List(),
  shipTypes: List(),
  slotItems: List()
});

export default createReducer(initialState, {
  [ApiEvents.INITIALIZE_GAME](state, action) {
    return state.merge(action.payload);
  }
});

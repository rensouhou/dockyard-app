/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/game
 */
import { ApiEvents } from '../actions/game';
import createReducer from './create-reducer';

const initialState = {
  ships: [],
  shipTypes: [],
  slotItems: []
};

export default createReducer(initialState, {
  [ApiEvents.INITIALIZE_GAME](state, action) {
    return { ...state, ...action.payload };
  }
});

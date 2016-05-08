/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/ships
 */
import createReducer from './create-reducer';
import { ApiEvents } from '../actions/game';

const initialState = {};

export default createReducer(initialState, {
  [ApiEvents.LOAD_FLEET_PRESET](state, action) {
    return { ...state };
  }
});

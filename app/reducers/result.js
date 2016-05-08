/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/result
 */
import createReducer from './create-reducer';
import { ApiEvents } from '../actions/game';

const initialState = {};

export default createReducer(initialState, {
  [ApiEvents.FINISHED_SORTIE](state, action) {
    return { ...state, ...action.payload };
  }
});

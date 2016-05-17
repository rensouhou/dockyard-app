/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/practice
 */
import { deepMerge } from '../transformers/utils';
import createReducer from './create-reducer';
import { ApiEvents } from '../actions/game';

const initialState = {
  opponents: {}
};

export default createReducer(initialState, {
  [ApiEvents.GET_OPPONENT_INFO](state, action) {
    return {
      ...state, ...{
        ...state.opponents,
        ...{ [action.payload.id]: deepMerge(action.payload) }
      }
    };
  }
});

/**
 * @overview
 *
 * @since 0.2.0
 */
import { fromJS } from 'immutable';
import createReducer from './create-reducer';
import { ApiEvents, ConstructionType } from '../constants';

const initialState = fromJS({
  type: ConstructionType.NONE
});

export default createReducer(initialState, {
  [ApiEvents.CRAFT_ITEM](state, { payload }) {
    return state;
  },
  [ApiEvents.CRAFT_SHIP](state, { payload }) {
    return state;
  }
});

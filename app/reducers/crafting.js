/**
 * @overview
 *
 * @since 0.2.0
 */
import { fromJS } from 'immutable';
import createReducer from './create-reducer';
import { ApiEvents, ConstructionState } from '../constants';

const initialState = fromJS({
  craftingState: ConstructionState.IDLE,
  createdEntity: null
});

/**
 * @type {{
 *  CRAFT_ITEM: *
 * }}
 */
const handlers = {
  [ApiEvents.CRAFT_ITEM](state, { payload }) {
    return state;
  },
  [ApiEvents.CRAFT_SHIP](state, { payload }) {
    return state;
  },
  [ApiEvents.GET_CONSTRUCTION_DOCKS](state, { payload }) {
    return state;
  }
};

export default createReducer(initialState, handlers);

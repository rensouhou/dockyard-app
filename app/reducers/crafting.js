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

const handlers = {
  [ApiEvents.CRAFT_ITEM](state, { payload }) {
    return state.mergeIn(['craftingState'], ConstructionState.COMPLETE)
                .mergeIn(['createdEntity'], payload.get('createdEntity'));
  },
  [ApiEvents.CRAFT_SHIP](state, { payload }) {
    return state.mergeIn(['craftingState'], ConstructionState.INCOMPLETE);
  },
  [ApiEvents.GET_CONSTRUCTION_DOCKS](state, { payload }) {
    return state;
  }
};

export default createReducer(initialState, handlers);

/**
 * @overview
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { ApiEvents } from '../constants';
import createReducer from './create-reducer';

const initialState = fromJS({
  ships: [],
  shipGraphics: [],
  shipTypes: [],
  slotItems: [],
  missions: [],
  furniture: [],
  mapAreas: [],
  mapBgms: [],
  mapInfos: [],
  mapNodes: [],
});

export default createReducer(initialState, {
  [ApiEvents.INITIALIZE_GAME](state, action) {
    return state.merge(action.payload);
  }
});

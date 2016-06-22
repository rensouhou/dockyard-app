/**
 * @overview
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { ApiEvents } from '../constants';
import createReducer from './create-reducer';

/** @type {IMap<string, *>} */
const initialState = fromJS({
  quests: [],
  activeQuests: []
});

export default createReducer(initialState, {
  [ApiEvents.GET_QUEST_LIST](state, action) {
    return state;
  },
  [ApiEvents.START_QUEST](state, action) {
    return state;
  },
  [ApiEvents.STOP_QUEST](state, action) {
    return state;
  }
});

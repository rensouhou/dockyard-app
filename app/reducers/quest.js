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
  questList: {
    totalQuestCount: undefined,
    currentPage: undefined,
    totalPageCount: undefined,
    currentActiveTab: undefined
  },
  quests: []
});

export default createReducer(initialState, {
  [ApiEvents.GET_QUEST_LIST](state, { payload }) {
    return state.mergeIn(['questList'], payload.get('questList'))
                .mergeDeepIn(['quests'], payload.get('quests'));
  },
  [ApiEvents.START_QUEST](state, { payload }) {
    return state;
  },
  [ApiEvents.STOP_QUEST](state, { payload }) {
    return state;
  }
});

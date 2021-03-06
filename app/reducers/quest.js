/**
 * @overview
 *
 * @since 0.1.0
 * @module app/reducers/quest
 */
import { fromJS } from 'immutable';
import { ApiEvents, QuestState } from '../constants';
import createReducer from './create-reducer';

/**
 * Initial state for the {@link QuestReducer}
 * @name QuestReducerInitialState
 * @type {IMap<string, *>}
 * @since 0.3.0
 */
const initialState = fromJS({
  questListState: {
    totalQuestCount: undefined,
    currentPage: undefined,
    totalPageCount: undefined,
    currentActiveTab: undefined
  },
  records: {}
});

/**
 * @name QuestReducer
 * @since 0.3.0
 */
export default createReducer(initialState, {
  [ApiEvents.GET_QUEST_LIST](state, { payload }) {
    return state.mergeDeep(payload);
  },
  [ApiEvents.START_QUEST](state, { payload }) {
    const questId = payload.getIn(['quest', 'id']);
    return state.updateIn(['records', questId], (q) => q.set('state', QuestState.IN_PROGRESS));
  },
  [ApiEvents.STOP_QUEST](state, { payload }) {
    const questId = payload.getIn(['quest', 'id']);
    return state.updateIn(['records', questId], (q) => q.set('state', QuestState.AVAILABLE));
  },
  [ApiEvents.COMPLETE_QUEST](state, { payload }) {
    const questId = payload.getIn(['quest', 'id']);
    return state.updateIn(['records', questId], (q) => q.set('state', QuestState.TURNED_IN));
  }
});

export { initialState as _initialState };

/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { Map, List } from 'immutable';
import { ApiEvents } from '../actions/game';
import createReducer from './create-reducer';
import { Enum } from '../helpers';

/** @type {DockyardState.quest} */
const initialState = Map({
  quests: List(),
  active: List()
});

const QuestProgressState = Enum({
  Zero: 0,
  Fifty: 1,
  Eighty: 2,
  Done: 3
});

const QuestState = Enum({
  Available: 1,
  InProgress: 2,
  Done: 3
});

/**
 * @param {Object} questObj
 * @param {Object} quests
 */
const updateQuests = (questObj, quests) => R.merge(questObj, quests);
const updateQuestState = (questObj, id, state) => R.assoc('state', state, questObj[id]);
const startQuest = (questObj, id) => updateQuestState(questObj, id, QuestState.InProgress);
const stopQuest = (questObj, id) => updateQuestState(questObj, id, QuestState.Available);

export default createReducer(initialState, {
  [ApiEvents.GET_QUEST_LIST](state, action) {
    return { quests: updateQuests(state.quests, action.payload.quests) };
  },
  [ApiEvents.START_QUEST](state, action) {
    return { quests: startQuest(state, action.payload.quest.id) };
  },
  [ApiEvents.STOP_QUEST](state, action) {
    return { ...state };
  }
});

/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/quest
 */
import { ApiEvents } from '../actions/game';
import createReducer from './create-reducer';
import { Enum } from '../helpers';

const initialState = {};

const QuestState = Enum({
  Zero: 0,
  Fifty: 1,
  Eighty: 2,
  Done: 3
});

/**
 * @param {Object} questObj
 * @param {Object} quests
 */
const updateQuests = (questObj, quests) => ({ ...questObj, ...quests });

const startQuest = (questObj, id) => ({
  ...questObj,
  ...{
    [id]: { ...questObj[id], state: 1 }
  }
});

export default createReducer(initialState, {
  [ApiEvents.GET_QUEST_LIST](state, action) {
    return { ...state, quests: updateQuests(state.quests, action.payload.quests) };
  },
  [ApiEvents.START_QUEST](state, action) {
    return { ...state };
  },
  [ApiEvents.STOP_QUEST](state, action) {
    return { ...state };
  }
});

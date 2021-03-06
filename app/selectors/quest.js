/**
 * @overview
 * @since 0.3.0
 * @module app/selectors/quest
 */
import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import { QuestState } from '../constants';

/**
 * @param {ApplicationStateRecord|Map} state
 */
const quests = (state) => state.getIn(['quest', 'records'], List())
                               .toMap()
                               .flatMap((q) => Map.of(q.get('id')));

/**
 * Get all quests currently present in the store.
 * @since 0.3.0
 */
export const getQuests = createSelector(
  [quests],
  (questList) => questList
);

/**
 * Get a {@link IMap<TId, TObj>} or the currently active quests.
 * @since 0.3.0
 */
export const getActiveQuests = createSelector(
  [quests],
  (questList) => questList.filter((q) => (
    q.state !== QuestState.AVAILABLE && q.state !== QuestState.TURNED_IN
  ))
);

/**
 * Gets the public-facing state of the {@link QuestReducerState}.
 * @since 0.3.0
 */
export const getQuestState = createSelector(
  [getActiveQuests],
  (activeQuests) => Map({
    activeQuests
  })
);

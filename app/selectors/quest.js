/**
 * @overview
 * @since 0.3.0
 * @module app/selectors/quest
 */
import { createSelector } from 'reselect';
import { Iterable, Map, List } from 'immutable';
import { QuestState } from '../constants';

/**
 * @param {ApplicationStateRecord|Map} state
 */
const quests = (state) => state.getIn(['quest', 'records'], List())
                               .toMap()
                               .flatMap((q) => Iterable.isIterable(q) ? Map.of(q.get('id'), q) : Map());

/**
 * Get all quests currently present in the store.
 * @since 0.3.0
 */
export const getQuests = createSelector(
  [quests],
  (questList) => questList
);

/**
 * Get a {@link Seq} or the currently active quests.
 * @since 0.3.0
 */
export const getActiveQuests = createSelector(
  [quests],
  (questList) => questList.filter((q) => q.state === QuestState.IN_PROGRESS)
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

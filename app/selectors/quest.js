/**
 * @overview
 * @since 0.3.0
 */
import { createSelector } from 'reselect';
import { Map, List, Seq } from 'immutable';
import { QuestRecord } from '../records';
import { QuestState } from '../constants';

/**
 * @param {ApplicationStateRecord|Map} state
 */
const quests = (state) => state.getIn(['quest', 'questList'], List())
                               .map((q) => new QuestRecord(q))
                               .toMap()
                               .flatMap((q) => Map.of(q.id, q));

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
  (questList) => Seq.Keyed(questList).filter((q) => q.state === QuestState.DONE)
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

/**
 * @overview
 *  Quest tracking middleware to update the quests' state
 *
 * @since 0.4.0
 */
import handler from './quest-tracker/index';

export default function createQuestTracker() {
  return ({ getState }) => (next) => (action) => {
    const state = getState();
    const result = handler(state, action);

    if (!result) {
      next(action);
    }
  };
}

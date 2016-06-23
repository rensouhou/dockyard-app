/**
 * @overview
 *
 * @since 0.3.0
 */
import { Enum } from './helpers';

/**
 * @readonly
 * @enum {number}
 * @type {Enum|Function}
 */
export const QuestProgressState = Enum({
  Zero: 0,
  Fifty: 1,
  Eighty: 2,
  Done: 3
});

/**
 * @readonly
 * @enum {number}
 * @type {Enum|Function}
 * @property {number} IN_PROGRESS
 */
export const QuestState = Enum({
  AVAILABLE: 1,
  IN_PROGRESS: 2,
  DONE: 3
});

/**
 * @readonly
 * @enum {number}
 * @type {Enum|Function}
 */
export const questListTabs = Enum({
  DEFAULT: 0,
  DAILY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
  ONE_TIME: 4,
  OTHERS: 5,
  IN_PROGRESS: 9
});


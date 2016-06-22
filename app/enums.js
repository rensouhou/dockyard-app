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
 */
export const QuestState = Enum({
  Available: 1,
  InProgress: 2,
  Done: 3
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


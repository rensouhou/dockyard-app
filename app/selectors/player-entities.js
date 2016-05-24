/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { createSelector } from 'reselect';

// Not necessary, but doing this just out of sheer cleanliness.
const { indexBy, prop, propOr, merge, map } = R;

// Create basic predicates
const getId = prop('id');
const indexByEntityId = indexBy(getId);

const getPlayerState = (state) => indexByEntityId(state.player.ships);  // not null-safe at startup time!
const getGameDataState = (state) => indexByEntityId(state.game.ships);  // not null-safe at startup time!
const combineWith = (base) => (it, key) => merge({}, base[key], it);

// Finally, something we can actually use
const combineTwoSets = (baseData, userData) => map(combineWith(baseData), userData);

/**
 * Create a memoized selector for combining the player's ships
 * with the base ship data.
 */
export const normalizeShips = createSelector(
  [getGameDataState, getPlayerState],
  (gameData, userData) => combineTwoSets(propOr('ships', gameData), userData.ships)
);

/**
 * Create a memoized selector for combining the player's equippable items
 * with the base equippable item data.
 */
export const normalizeSlotItems = createSelector(
  [getGameDataState, getPlayerState],
  (gameData, userData) => combineTwoSets(gameData.slotItems, userData.slotItems)
);

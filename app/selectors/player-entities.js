/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { createSelector } from 'reselect';

// Not necessary, but doing this just out of sheer cleanliness.
const { indexBy, prop, isEmpty, mergeAll, map } = R;

// Create basic predicates
const getId = prop('shipId');
const indexByEntityId = indexBy(getId);

const getPlayerState = (state) => indexByEntityId(state.player.ships);  // not null-safe at startup time!
const getGameDataState = (state) => indexByEntityId(state.game.ships);  // not null-safe at startup time!

// Finally, something we can actually use
const combineTwoSets = (baseData, userData) => {
  let result = [];
  try {
    result = map((it) => mergeAll([{}, baseData[it.shipId], it]), userData);
  }
  catch (e) {
    console.error('couldn\'t do anything', e.message, e.stack);
  }
  return result;
};

/**
 * Create a memoized selector for combining the player's ships
 * with the base ship data.
 */
export const normalizeShips = createSelector(
  [getGameDataState, getPlayerState],
  (gameData, userData) => isEmpty(gameData) ? [] : combineTwoSets(gameData, userData)
);

/**
 * Create a memoized selector for combining the player's equippable items
 * with the base equippable item data.
 */
export const normalizeSlotItems = createSelector(
  [getGameDataState, getPlayerState],
  (gameData, userData) => combineTwoSets(gameData.slotItems, userData.slotItems)
);

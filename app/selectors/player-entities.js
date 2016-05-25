/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import S from 'sanctuary';
import { createSelector } from 'reselect';

const { Maybe, Either } = S;

// Not necessary, but doing this just out of sheer cleanliness.
const { is, indexBy, not, prop, mergeAll, map, values } = R;

// Create basic predicates
const isObject = is(Object);
const indexByEntityId = (key = 'id') => indexBy(key);

const getPlayerState = (state) => state.player;  // not null-safe at startup time!
const getGameDataState = (state) => state.game;  // not null-safe at startup time!

// Finally, something we can actually use
const combineTwoSets = (baseData, userData) => {
  // console.log('combineTwoSets:\n\tbaseData => %O\n\tuserData => %O', baseData, userData);
  const userDataVerified = not(isObject(userData))
    ? userData
    : values(userData);

  // Normalize the data first
  const baseDataNormalized = indexBy(prop('shipId'), baseData);
  const userDataNormalized = indexBy(prop('id'), userDataVerified);
  let result = [];
  try {
    result = map(
      (it) => mergeAll([{}, baseDataNormalized[it.shipId], it]),
      userDataNormalized
    );
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
  (gameData, userData) => combineTwoSets(gameData.ships, userData.ships)
);

/**
 * Create a memoized selector for combining the player's equippable items
 * with the base equippable item data.
 */
export const normalizeSlotItems = createSelector(
  [getGameDataState, getPlayerState],
  (gameData, userData) => combineTwoSets(gameData.slotItems, userData.slotItems)
);

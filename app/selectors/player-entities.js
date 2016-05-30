/* eslint no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { createSelector } from 'reselect';
import { Collection } from 'immutable';

// Doing this just out of making things pretty
const { is, isEmpty, indexBy, not, prop, mergeAll, map, values } = R;
const isObject = is(Object);
const isRecord = (record) =>
  not(isEmpty(record)) && Collection.isIterable(record) && not(isEmpty(record._defaultValues));

// Base data selectors
// -------------------
const getPlayerState = (state) => state.player;  // not null-safe at startup time!
const getGameDataState = (state) => state.game;  // not null-safe at startup time!

// Finally, something we can actually use
const combineTwoSets = (baseData, userData, record) => {
  const userDataVerified = not(isObject(userData))
    ? userData
    : values(userData);

  // Normalize the data first
  const baseDataNormalized = indexBy(prop('shipId'), baseData);
  const userDataNormalized = indexBy(prop('id'), userDataVerified);
  let result = [];
  try {
    result = map(
      (it) => isRecord(record)
        ? new record(mergeAll([{}, baseDataNormalized[it.shipId], it]))
        : mergeAll([{}, baseDataNormalized[it.shipId], it]),
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
export const getNormalizedShips = createSelector(
  [getGameDataState, getPlayerState],
  (gameData, userData) => combineTwoSets(gameData.ships, userData.ships)
);

/**
 * Create a memoized selector for combining the player's equippable items
 * with the base equippable item data.
 */
export const getNormalizedSlotItems = createSelector(
  [getGameDataState, getPlayerState],
  (gameData, userData) => combineTwoSets(gameData.slotItems, userData.slotItems)
);

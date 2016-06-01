/* eslint no-confusing-arrow: 0, max-len: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { Ship as ShipRecord, SlotItem as SlotItemRecord } from '../records';

// Doing this just out of making things pretty
const { is, isEmpty, indexBy, not, prop, mergeAll, map, values } = R;
const isObject = is(Object);

// Base data selectors
const getPlayerState = (state) => state.player;  // not null-safe at startup time!
const getGameDataState = (state) => state.game;  // not null-safe at startup time!

const combine = (...args) => mergeAll([{}, ...args]);

// Finally, something we can actually use
const combineTwoSets = (baseData, userData, baseKey = 'shipId', userKey = 'id', record) => {
  const userDataVerified = not(isObject(userData))
    ? userData
    : values(userData);
  const hasRecord = !!record;

  // Normalize the data first
  const baseDataNormalized = indexBy(prop(baseKey), baseData);
  const userDataNormalized = indexBy(prop(userKey), userDataVerified);
  let result = [];
  try {
    result = map(
      (it) => {
        const c = combine(baseDataNormalized[it[baseKey]], it);
        return hasRecord ? new record(c) : c;
      },
      userDataNormalized
    );
  }
  catch (e) {
    console.error('couldn\'t do anything', e.message, e.stack);
  }

  const newResult = fromJS(result);
  console.log('newResult =>', newResult);
  try {
    console.groupCollapsed();
    console.log(' ->', JSON.parse(JSON.stringify(newResult)));
    console.groupEnd();
  }
  catch (e) {
    console.error('jee!');
  }
  return result;
};

/**
 * Create a memoized selector for combining the player's ships
 * with the base ship data.
 */
export const getNormalizedShips = createSelector(
  [getGameDataState, getPlayerState],
  (gameData, userData) => combineTwoSets(gameData.ships, userData.ships, 'shipId', 'id', ShipRecord)
);

/**
 * Create a memoized selector for combining the player's equippable items
 * with the base equippable item data.
 */
export const getNormalizedSlotItems = createSelector(
  [getGameDataState, getPlayerState],
  (gameData, userData) => combineTwoSets(gameData.slotItems, userData.slotItems, 'slotItemId', 'id', SlotItemRecord)
);

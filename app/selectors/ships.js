/* eslint no-underscore-dangle: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import R from 'ramda';
import { createSelector } from 'reselect';

// Utility
const _ = R.__;

const findByProp = (idProp, id, list) => R.find(R.propEq(idProp, id), list);
const combineItem = (l, r) => ({ ...l, ...r });
const combineTwoLists = (target, base, pk) => R.map(it =>
  combineItem(findByProp(pk, it[pk], base), findByProp(pk, it[pk], target)), target);

const combine = R.curry(combineTwoLists);
const combineByKey = combine(_, _);


// Selector data
const getPlayerShips = state => state.player.ships;
const getPlayerSlotItems = state => state.player.slotItems;
const getBaseShips = state => state.game.ships;
const getBaseSlotItems = state => state.game.slotItems;
// For the sake of finding something easier
const getBaseShipsObj = state => R.indexBy(R.prop('shipId'), state.game.ships);
const getShipSort = state => state.appState.sort;

const combinePlayerShips = (ships, baseShips) =>
  R.map(s => ({ ...baseShips[s.shipId], ...s, $_combined: true }), ships);

// Export usable functions
export const combineShips = createSelector([getPlayerShips, getBaseShipsObj], combinePlayerShips);
export const combineSlotItems = createSelector(
  [getPlayerSlotItems, getBaseSlotItems],
  (slotItems, baseSlotItems) => {
    // @todo(@stuf): why does this behave like this?
    const playerItems = R.pipe(R.toPairs, R.map(R.tail), R.flatten)(slotItems);
    const baseItems = R.indexBy(R.prop('slotItemId'), baseSlotItems);
    return R.map(it => ({ ...baseItems[it.slotItemId], ...it, $_combined: true }), playerItems);
  });

export const combined = createSelector(
  [combineShips, combineSlotItems],
  (ships, slotItems) => ({ ships, slotItems }));

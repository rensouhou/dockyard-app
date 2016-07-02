/**
 * @overview
 * @since 0.4.0
 */
import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

/**
 * @type {function}
 * @param {ApplicationReducerState} state
 * @return {Immutable.Map<number, ShipRecord>}
 */
const baseShips = (state) => state.getIn(['game', 'ships'], List())
                                  .toMap()
                                  .flatMap((ship) => Map.of(ship.get('shipId'), ship));

/**
 * @type {function}
 * @param {ApplicationReducerState} state
 * @return {Immutable.Map<number, SlotItemRecord>}
 */
const baseSlotItems = (state) => state.getIn(['game', 'slotItems'], List())
                                      .toMap()
                                      .flatMap((item) => Map.of(item.get('slotItemId'), item));

export const getBaseShipList = createSelector(
  [baseShips],
  (baseShipList) => baseShipList
);

export const getBaseSlotItemList = createSelector(
  [baseSlotItems],
  (baseSlotItemList) => baseSlotItemList
);

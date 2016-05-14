/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { createSelector } from 'reselect';
import { normalize, Schema, arrayOf, valuesOf } from 'normalizr';
import { combineShips } from './ships';
import { combineSlotItems } from './slot-items';
import { combineFleets } from './fleets';

const slotItem = new Schema('slotItem');
const ship = new Schema('ships', {
  slot: {
    items: valuesOf(slotItem)
  }
});

const fleet = new Schema('fleets', {
  ships: valuesOf(ship)
});

const schema = {
  ships: arrayOf(ship),
  slotItems: arrayOf(slotItem),
  fleets: arrayOf(fleet)
};

export const gameEntities = createSelector(
  [combineShips, combineSlotItems, combineFleets],
  (ships, slotItems, fleets) =>
    normalize({ ships, slotItems, fleets }, schema));

/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { createSelector } from 'reselect';

const { compose, flatten, map, tail, toPairs, indexBy, prop, mergeAll } = R;

const getSlotItems = state => state.player.slotItems;
const getBaseSlotItems = state => state.game.slotItems;

const getValues = compose(flatten, map(tail), toPairs);
const prepareBaseItems = (items) => indexBy(prop('slotItemId'), items);

// @todo(@stuf): replace with generic functions
export const combineSlotItems = createSelector(
  [getSlotItems, getBaseSlotItems],
  (slotItems, baseSlotItems) => {
    // @todo(@stuf): why does this behave like this?
    const playerItems = getValues(slotItems);
    const baseItems = prepareBaseItems(baseSlotItems);
    return map((it) => mergeAll([{}, baseItems[it.slotItemId], it]), playerItems);
  });

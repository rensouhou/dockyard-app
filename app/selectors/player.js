/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { createSelector } from 'reselect';
import { getNormalizedShips, getNormalizedSlotItems } from './player-entities';
import { Player } from '../records';

const { pathOr, map, reduce } = R;

// [1, 2, 3].forEach(function (item) {
//   // derp
// })

const playerFleetList = state => pathOr([], ['player', 'fleets'], state);
const playerProfile = state => pathOr([], ['player', 'profile'], state);
const playerMaterials = state => pathOr([], ['player', 'materials'], state);

const getShipWithSlotItems = (ship, normalizedSlotItems) => ({
  ...ship,
  slot: {
    ...ship.slot,
    items: ship.slot.items.reduce((acc, id) => [...acc, normalizedSlotItems[id]], [])
  }
});

export const getPlayerFleets = createSelector(
  [playerFleetList, getNormalizedShips, getNormalizedSlotItems],
  (fleetList, normalizedShips, normalizedSlotItems) =>
    fleetList.map((it) => Player.Fleet({
      ...it,
      ships: it.ships.map((shipId) =>
        getShipWithSlotItems(normalizedShips[shipId], normalizedSlotItems))
    })));

export const getPlayerProfile = createSelector(
  [playerProfile],
  (profile) => new Player.Profile(profile)
);

export const getPlayerMaterials = createSelector(
  [playerMaterials],
  (materials) => new Player.Materials(materials)
);

// The entire player-related dataset for the UI
export const getPlayer = createSelector(
  [getPlayerFleets, getPlayerProfile, getPlayerMaterials],
  (fleets, profile, materials) => ({ fleets, profile, materials })
);

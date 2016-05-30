/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 *
 * @todo Aircraft proficiency calculation
 */
import R from 'ramda';
import { listOrDefault, objOrDefault } from '../helpers';
import { createSelector } from 'reselect';
import { getNormalizedShips, getNormalizedSlotItems } from './player-entities';
import { Player, Ship } from '../records';

const { pathOr, map, reduce } = R;

/**
 * Get a null-safe state of the player's fleet
 * @param state
 * @returns {object[]}
 */
const playerFleetList = (state) => listOrDefault(state, 'player', 'fleets');

/**
 * Get a null-safe state of the player profile
 * @param state
 * @returns {object[]}
 */
const playerProfile = (state) => listOrDefault(state, 'player', 'profile');

/**
 * Get a null-safe state of player materials
 * @param state
 * @returns {object}
 */
const playerMaterials = (state) => objOrDefault(state, 'player', 'materials');

/**
 * @todo Document me
 * @param ship
 * @param normalizedSlotItems
 * @return {Ship}
 */
const getShipWithSlotItems = (ship, normalizedSlotItems) => ({
  ...ship,
  slot: {
    ...ship.slot,
    items: ship.slot.items.reduce((acc, id) => [...acc, normalizedSlotItems[id]], [])
  }
});

/**
 * Public-facing selectors
 */

/**
 */
export const getPlayerFleets = createSelector(
  [playerFleetList, getNormalizedShips, getNormalizedSlotItems],
  /**
   * @param fleetList
   * @param normalizedShips
   * @param normalizedSlotItems
   * @returns {object[]}
   */
  (fleetList, normalizedShips, normalizedSlotItems) =>
    fleetList.map((it) => Player.Fleet({
      ...it,
      ships: it.ships.map((shipId) =>
        new Ship(getShipWithSlotItems(normalizedShips[shipId], normalizedSlotItems)))
    })));

export const getPlayerProfile = createSelector(
  [playerProfile],
  /**
   * @param profile
   * @return {Player.Profile}
   */
  (profile) => new Player.Profile(profile)
);

export const getPlayerMaterials = createSelector(
  [playerMaterials],
  /**
   * @param materials
   * @return {Player.Materials}
   */
  (materials) => new Player.Materials(materials)
);

// The entire player-related dataset for the UI
export const getPlayer = createSelector(
  [getPlayerFleets, getPlayerProfile, getPlayerMaterials],
  /**
   * @param fleets
   * @param profile
   * @param materials
   */
  (fleets, profile, materials) => ({ fleets, profile, materials })
);

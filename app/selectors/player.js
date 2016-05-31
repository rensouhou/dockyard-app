/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 *
 * @todo Aircraft proficiency calculation
 */
import { Seq } from 'immutable';
import { listOrDefault, objOrDefault } from '../helpers';
import { createSelector } from 'reselect';
import { getNormalizedShips, getNormalizedSlotItems } from './player-entities';
import { PlayerProfile, Materials, Fleet, Ship } from '../records';

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
    // @todo rewrite as a Seq
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
    fleetList.map((it) => new Fleet({
      ...it,
      /** @todo Write as a {@link Seq} */
      ships: it.ships.map((shipId) => getShipWithSlotItems(normalizedShips[shipId], normalizedSlotItems))
    })));

export const getPlayerProfile = createSelector(
  [playerProfile],
  /**
   * @param profile
   * @return {Player.Profile}
   */
  (profile) => new PlayerProfile(profile)
);

export const getPlayerMaterials = createSelector(
  [playerMaterials],
  /**
   * @param materials
   * @return {Player.Materials}
   */
  (materials) => new Materials(materials)
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

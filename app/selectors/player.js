/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 *
 * @todo Aircraft proficiency calculation
 */
import R from 'ramda';
import { List } from 'immutable';
import { createSelector } from 'reselect';
import { PlayerProfile, Materials, Ship } from '../records';

/**
 * Get a null-safe state of the player's fleet
 * @param state
 * @returns {object[]}
 */
const playerFleetList = (state) => state.getIn(['player', 'fleets'], List());

/**
 * Get a null-safe state of the player profile
 * @param state
 * @returns {object[]}
 */
const playerProfile = (state) => state.getIn(['player', 'profile'], new PlayerProfile());

/**
 * Get a null-safe state of player materials
 * @param state
 * @returns {object}
 */
const playerMaterials = (state) => state.getIn(['player', 'materials'], new Materials());

/**
 * @todo Document me
 * @param ship
 * @param normalizedSlotItems
 * @return {Ship}
 */
const getShipWithSlotItems = (ship, normalizedSlotItems) =>
  ship.set('slot', R.mergeAll([
    {}, ship.get('slot'), {
      items: ship.get('slot').items.reduce((acc, id) => acc.concat(normalizedSlotItems.get(id)), [])
    }
  ]));

/**
 * Public-facing selectors
 */

export const getPlayerFleets = createSelector(
  [playerFleetList],
  /**
   * @param fleetList
   * @returns {object[]}
   */
  (fleetList) => fleetList
  // fleetList.map((it) => new Fleet({
  //  ...it,
  //  /** @todo Write as a {@link Seq} */
  //  ships: it.ships.map((shipId) =>
  //    getShipWithSlotItems(normalizedShips.get(shipId), normalizedSlotItems))
  // }))
);

export const getPlayerProfile = createSelector(
  [playerProfile],
  /**
   * @param profile
   * @return {Player.Profile}
   */
  (profile) => profile
);

export const getPlayerMaterials = createSelector(
  [playerMaterials],
  /**
   * @param materials
   * @return {Player.Materials}
   */
  (materials) => materials
);

// The entire player-related dataset for the UI
export const getPlayer = createSelector(
  [getPlayerFleets, getPlayerProfile, getPlayerMaterials],
  /**
   * @param fleets
   * @param profile
   * @param materials
   */
  (fleets, profile, materials) => ({
    fleets, profile, materials
  })
);

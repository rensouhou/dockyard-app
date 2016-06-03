/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 *
 * @todo Aircraft proficiency calculation
 */
import { Map, List } from 'immutable';
import { createSelector } from 'reselect';
import { PlayerProfile, Materials } from '../records';

/**
 * Null-safe data getters
 */

/**
 * Get state of the player's fleet
 * @param state
 * @returns {Immutable.List<Fleet>}
 */
const playerFleetList = (state) => state.getIn(['player', 'fleets'], List());

/**
 * Get the player ship list
 * @param state
 * @returns {Immutable.List<Ship>}
 */
const playerShipList = (state) => state.getIn(['player', 'ships'], List());

/**
 * Get the master game ship list
 * @param state
 * @returns {Immutable.List<Ship>}
 */
const baseShipList = (state) => state.getIn(['game', 'ships'], List());

/**
 * @param state
 * @return {Immutable.List<SlotItem>}
 */
const playerSlotItemList = (state) => state.getIn(['player', 'slotItems'], List());

/**
 * Get state of the player profile
 * @param state
 * @returns {PlayerProfile}
 */
const playerProfile = (state) => state.getIn(['player', 'profile'], new PlayerProfile());

/**
 * Get state of player materials
 * @param state
 * @returns {Materials}
 */
const playerMaterials = (state) => state.getIn(['player', 'materials'], new Materials());

/** **
 * Public-facing selectors
 */

/**
 * Player fleet selector
 */
export const getPlayerFleets = createSelector(
  [playerFleetList],
  /**
   * @param {Immutable.List<Fleet>} fleetList
   * @return {Immutable.List<Fleet>}
   */
  (fleetList) => fleetList
);

/**
 * Player ship selector
 */
export const getPlayerShips = createSelector(
  [playerShipList],
  /**
   * @param {Immutable.List<Ship>} playerShips
   * @return {Immutable.List<Ship>}
   */
  (playerShips) => playerShips
);

export const getPlayerSlotItems = createSelector(
  [playerSlotItemList],
  /**
   * @param {Immutable.List<SlotItem>} playerSlotItems
   * @return {Immutable.List<SlotItem>}
   */
  (playerSlotItems) => playerSlotItems
);

/**
 * WIP: Player fleet selector
 */
export const getPlayerFleetsList = createSelector(
  [playerFleetList, playerShipList, baseShipList],
  /**
   * @param {Immutable.List<Fleet>} fleetList
   * @param {Immutable.List<Ship>} playerShips
   * @param {Immutable.List<Ship>} baseShips
   * @return {Immutable.List<Fleet>}
   */
  (fleetList, playerShips, baseShips) => List(fleetList)
    .flatMap((fleet, idx) => Map(fleet))
);

/**
 * Player profile selector
 */
export const getPlayerProfile = createSelector(
  [playerProfile],
  /**
   * @param {PlayerProfile} profile
   * @return {PlayerProfile}
   */
  (profile) => profile
);

/**
 * Player material state selector
 */
export const getPlayerMaterials = createSelector(
  [playerMaterials],
  /**
   * @param {Materials} materials
   * @return {Materials}
   */
  (materials) => materials
);

/**
 * Player main state selector (for UI)
 */
export const getPlayer = createSelector(
  [getPlayerFleets, getPlayerProfile, getPlayerMaterials, getPlayerShips, getPlayerSlotItems],
  /**
   * @param {Immutable.List<Fleet>} fleets
   * @param {PlayerProfile} profile
   * @param {Materials} materials
   * @param {Immutable.List<Ship>} ships
   * @param {Immutable.List<SlotItem>} slotItems
   * @return {Immutable.Map}
   */
  (fleets, profile, materials, ships, slotItems) => Map({
    fleets, profile, materials, ships, slotItems
  })
);

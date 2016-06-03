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
 * @returns {object[]}
 */
const playerFleetList = (state) => state.getIn(['player', 'fleets'], List());

/**
 * Get the player ship list
 * @param state
 * @returns {object[]}
 */
const playerShipList = (state) => state.getIn(['player', 'ships'], List());

/**
 * Get the master game ship list
 * @param state
 * @returns {object[]}
 */
const baseShipList = (state) => state.getIn(['game', 'ships'], List());

/**
 * Get state of the player profile
 * @param state
 * @returns {object[]}
 */
const playerProfile = (state) => state.getIn(['player', 'profile'], new PlayerProfile());

/**
 * Get state of player materials
 * @param state
 * @returns {object}
 */
const playerMaterials = (state) => state.getIn(['player', 'materials'], new Materials());

/********************************************************************
 * Public-facing selectors
 */

/**
 * Player fleet selector
 */
export const getPlayerFleets = createSelector(
  [playerFleetList],
  (fleetList) => fleetList
);

/**
 * Player ship selector
 */
export const getPlayerShips = createSelector(
  [playerShipList],
  (playerShips) => playerShips
);

/**
 * WIP: Player fleet selector
 */
export const getPlayerFleetsList = createSelector(
  [playerFleetList, playerShipList, baseShipList],
  (fleetList, playerShips, baseShips) => List(fleetList)
    .flatMap((fleet, idx) => Map(fleet))
);

/**
 * Player profile selector
 */
export const getPlayerProfile = createSelector(
  [playerProfile],
  /**
   * @param profile
   * @return {Player.Profile}
   */
  (profile) => profile
);

/**
 * Player material state selector
 */
export const getPlayerMaterials = createSelector(
  [playerMaterials],
  /**
   * @param materials
   * @return {Player.Materials}
   */
  (materials) => materials
);

/**
 * Player main state selector (for UI)
 */
export const getPlayer = createSelector(
  [getPlayerFleets, getPlayerProfile, getPlayerMaterials, getPlayerShips],
  /**
   * @param fleets
   * @param profile
   * @param materials
   * @param ships
   */
  (fleets, profile, materials, ships) => Map({
    fleets, profile, materials, ships
  })
);

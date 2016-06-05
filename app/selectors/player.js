/* eslint no-param-reassign: 0, no-return-assign: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 *
 * @todo Aircraft proficiency calculation
 */
import { Map, List, Seq } from 'immutable';
import { createSelector } from 'reselect';
import { PlayerProfile, Materials, Ship } from '../records';

/**
 * @param {Immutable.Map} ship
 * @returns {Number}
 */
const getShipId = (ship) => ship.get('shipId');

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
 * @returns {Immutable.Map<Number, Ship>}
 */
const playerShipList = (state) =>
  state.getIn(['player', 'ships'], List())
       .toMap()
       .flatMap((ship) => Map.of(ship.get('id'), ship));

/**
 * Get the master game ship list
 * @param state
 * @returns {Immutable.Map<Number, Ship>}
 */
const baseShipList = (state) =>
  state.getIn(['game', 'ships'], List())
       .toMap()
       .flatMap((ship) => Map.of(ship.get('shipId'), ship));

/**
 * @param state
 * @return {Immutable.Map<Number, SlotItem>}
 */
const playerSlotItemList = (state) =>
  state.getIn(['player', 'slotItems'], List())
       .toMap()
       .flatMap((item) => Map.of(item.get('id'), item));

/**
 * @param state
 * @return {Immutable.Map<Number, SlotItem>}
 */
const baseSlotItemList = (state) =>
  state.getIn(['game', 'slotItems'], List())
       .toMap()
       .flatMap((item) => Map.of(item.get('slotItemId'), item));

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

/**
 * Public-facing selectors
 **************************************/

/**
 * Player ship selector
 */
export const getPlayerShips = createSelector(
  [playerShipList, baseShipList],
  /**
   * @param {Immutable.Map<Number, Ship|Map>} playerShips
   * @param {Immutable.Map<Number, Ship|Map>} baseShips
   * @return {Immutable.Map<Number, Ship>}
   */
  (playerShips, baseShips) =>
    playerShips.map((ship) =>
      new Ship(baseShips.get(ship.get('shipId')).mergeDeep(ship)))
);

/**
 * Player slot item selector
 */
export const getPlayerSlotItems = createSelector(
  [playerSlotItemList],
  /**
   * @param {Immutable.Map<Number, SlotItem>} playerSlotItems
   * @return {Immutable.Map<Number, SlotItem>}
   */
  (playerSlotItems) => playerSlotItems
);

/**
 * Player fleet selector
 */
export const getPlayerFleets = createSelector(
  [playerFleetList, getPlayerShips, getPlayerSlotItems],
  /**
   * @param {Immutable.List<Fleet|Map>} fleetList
   * @param {Immutable.Map<Number, Ship|Map>} playerShipMap
   * @param {Immutable.Map<Number, SlotItem|Map>} playerSlotItems
   * @return {Immutable.List<Fleet>}
   */
  (fleetList, playerShipMap, playerSlotItems) => fleetList
    .map((fleet) => {
      console.log('fleet => ', fleet);
      const fleetShipIds = fleet.ships;
      const ships = fleetShipIds.map((id) => playerShipMap.get(id));
      return fleet.merge({ ships });
    })
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
   * @typedef {Immutable.Map<string, *>} UIStatePlayer
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

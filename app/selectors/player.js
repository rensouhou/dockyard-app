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
import {
  PlayerProfile,
  MaterialState as MaterialState,
  Fleet as FleetRecord,
  Ship as ShipRecord,
  SlotItem as SlotItemRecord
} from '../records';

/**
 * Null-safe data getters
 */

/**
 * Get state of the player's fleet
 * @param state
 * @returns {List<Fleet>}
 */
const playerFleetList = (state) => state.getIn(['player', 'fleets'], List());

/**
 * Get the player ship list
 * @param state
 * @returns {Map<number, Ship>}
 */
const playerShipList = (state) =>
  state.getIn(['player', 'ships'], List())
       .toMap()
       .flatMap((ship) => Map.of(ship.get('id'), ship));

/**
 * Get the master game ship list
 * @param state
 * @returns {Map<number, Ship>}
 */
const baseShipList = (state) =>
  state.getIn(['game', 'ships'], List())
       .toMap()
       .flatMap((ship) => Map.of(ship.get('shipId'), ship));

/**
 * Usable ship list containing complete {@link ShipRecord} entities.
 * @type {List<Ship>}
 */
const getShipList = createSelector(
  [playerShipList, baseShipList],
  /**
   * @param {Map<number, Ship>} playerShips
   * @param {Map<number, Ship>} baseShips
   * @returns {List<Ship>}
   */
  (playerShips, baseShips) =>
    playerShips.map((ship) =>
      new ShipRecord(baseShips.get(ship.get('shipId')).mergeDeep(ship)))
);

/**
 * @param {ApplicationReducerState} state
 * @return {Map<number, SlotItem>}
 */
const playerSlotItemList = (state) =>
  state.getIn(['player', 'slotItems'], List())
       .toMap()
       .flatMap((item) => Map.of(item.get('id'), item));

/**
 * @param {ApplicationReducerState} state
 * @return {Map<number, SlotItem>}
 */
const baseSlotItemList = (state) =>
  state.getIn(['game', 'slotItems'], List())
       .toMap()
       .flatMap((item) => Map.of(item.get('slotItemId'), item));

/**
 * Get state of the player profile
 * @param {ApplicationReducerState} state
 * @returns {PlayerProfile}
 */
const playerProfile = (state) => state.getIn(['player', 'profile'], Map());

/**
 * Get state of player materials
 * @param {ApplicationReducerState} state
 * @returns {MaterialStateRecord}
 */
const playerMaterials = (state) => state.getIn(['player', 'materials'], Map());

/**
 * Public-facing selectors
 **************************************/

/**
 * Player slot item selector
 */
export const getPlayerSlotItems = createSelector(
  [playerSlotItemList, baseSlotItemList],
  /**
   * @param {Map<number, SlotItem|Map>} playerSlotItems
   * @param {Map<number, SlotItem|Map>} baseSlotItems
   * @return {Map<number, SlotItem>}
   */
  (playerSlotItems, baseSlotItems) =>
    playerSlotItems.map((item) =>
      new SlotItemRecord(baseSlotItems.get(item.get('slotItemId')).mergeDeep(item)))
);

/**
 * Player ship selector
 */
export const getPlayerShips = createSelector(
  [getShipList, getPlayerSlotItems],
  /**
   * @param {Map<number, Ship|Map>} shipList
   * @param {Map<number, SlotItem|Map>} slotItems
   * @return {Map<number, Ship>}
   */
  (shipList, slotItems) => shipList.map((ship) =>
    ship.mergeDeepIn(['slot', 'items'],
      ship.getIn(['slot', 'items'])
          .map((id) => slotItems.get(id))
    )
  )
);

/**
 * Player fleet selector
 * Populates the fleet's ship list with {@link Ship} records
 * @type {List<Fleet|Map>}
 */
export const getPlayerFleets = createSelector(
  [playerFleetList, getPlayerShips],
  /**
   * @param {List<Fleet|Map>} fleetList
   * @param {Map<number, Ship|Map>} playerShipMap
   * @return {List<Fleet|Map>}
   */
  (fleetList, playerShipMap) => fleetList
    .map((fleet) => fleet.mergeIn(['ships'], fleet.get('ships').map((id) => playerShipMap.get(id))))
    .map((fleet) => new FleetRecord(fleet))
);

/**
 * Player profile selector
 * @type {List<Fleet|Map>}
 */
export const getPlayerProfile = createSelector(
  [playerProfile],
  /**
   * @param {Map<string, *>} profile
   * @return {PlayerProfile}
   */
  (profile) => new PlayerProfile(profile)
);

/**
 * Player material state selector
 * @type {List<Fleet|Map>}
 */
export const getPlayerMaterials = createSelector(
  [playerMaterials],
  /**
   * @param {MaterialState} materials
   * @return {MaterialState}
   */
  (materials) => new MaterialState(materials)
);

/**
 * Player main state selector (for UI)
 * @type {Map}
 */
export const getPlayer = createSelector(
  [getPlayerFleets, getPlayerProfile, getPlayerMaterials, getPlayerShips, getPlayerSlotItems],
  /**
   * @typedef {Map<string, *>} UIStatePlayer
   * @param {List<Fleet>} fleets
   * @param {PlayerProfile} profile
   * @param {MaterialState} materials
   * @param {List<Ship>} ships
   * @param {List<SlotItem>} slotItems
   * @return {Map<string, Map<string, *>>}
   */
  (fleets, profile, materials, ships, slotItems) => Map({
    fleets, profile, materials, ships, slotItems
  })
);

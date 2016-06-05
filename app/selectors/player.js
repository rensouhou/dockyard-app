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
  Materials as MaterialState,
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
 * @returns {Immutable.List<Fleet>}
 */
const playerFleetList = (state) => state.getIn(['player', 'fleets'], List());

/**
 * Get the player ship list
 * @param state
 * @returns {Immutable.Map<number, Ship>}
 */
const playerShipList = (state) =>
  state.getIn(['player', 'ships'], List())
       .toMap()
       .flatMap((ship) => Map.of(ship.get('id'), ship));

/**
 * Get the master game ship list
 * @param state
 * @returns {Immutable.Map<number, Ship>}
 */
const baseShipList = (state) =>
  state.getIn(['game', 'ships'], List())
       .toMap()
       .flatMap((ship) => Map.of(ship.get('shipId'), ship));

/**
 * Get the finally usable ship list
 */
const getShipList = createSelector(
  [playerShipList, baseShipList],
  (playerShips, baseShips) =>
    playerShips.map((ship) => new ShipRecord(baseShips.get(ship.get('shipId')).mergeDeep(ship)))
);

/**
 * @param state
 * @return {Immutable.Map<number, SlotItem>}
 */
const playerSlotItemList = (state) =>
  state.getIn(['player', 'slotItems'], List())
       .toMap()
       .flatMap((item) => Map.of(item.get('id'), item));

/**
 * @param state
 * @return {Immutable.Map<number, SlotItem>}
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
const playerProfile = (state) => state.getIn(['player', 'profile'], Map());

/**
 * Get state of player materials
 * @param state
 * @returns {Materials}
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
   * @param {Immutable.Map<number, SlotItem|Immutable.Map>} playerSlotItems
   * @param {Immutable.Map<number, SlotItem|Immutable.Map>} baseSlotItems
   * @return {Immutable.Map<number, SlotItem>}
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
   * @param {Immutable.Map<number, Ship|Immutable.Map>} shipList
   * @param {Immutable.Map<number, SlotItem|Immutable.Map>} slotItems
   * @return {Immutable.Map<number, Ship>}
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
 */
export const getPlayerFleets = createSelector(
  [playerFleetList, getPlayerShips],
  /**
   * @param {Immutable.List<Fleet|Immutable.Map>} fleetList
   * @param {Immutable.Map<number, Ship|Immutable.Map>} playerShipMap
   * @return {Immutable.List<Fleet|Immutable.Map>}
   */
  (fleetList, playerShipMap) => fleetList
    .map((fleet) => fleet.mergeIn(['ships'], fleet.get('ships').map((id) => playerShipMap.get(id))))
    .map((fleet) => new FleetRecord(fleet))
);

/**
 * Player profile selector
 */
export const getPlayerProfile = createSelector(
  [playerProfile],
  /**
   * @param {Immutable.Map<string, *>} profile
   * @return {PlayerProfile}
   */
  (profile) => new PlayerProfile(profile)
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
  (materials) => new MaterialState(materials)
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

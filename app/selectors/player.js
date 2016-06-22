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
  PlayerProfileRecord,
  MaterialStateRecord,
  FleetRecord as FleetRecord,
  Ship as ShipRecord,
  SlotItem as SlotItemRecord
} from '../records';

/**
 * Null-safe data getters
 */

/**
 * Get state of the player's fleet
 * @type {function}
 * @param {ApplicationReducerState} state
 * @returns {IList<FleetRecord>}
 */
const playerFleetList = (state) => state.getIn(['player', 'fleets'], List());

/**
 * Get the player ship list
 * @type {function}
 * @param {ApplicationReducerState} state
 * @returns {IMap<number, Ship>}
 */
const playerShipList = (state) =>
  state.getIn(['player', 'ships'], List())
       .toMap()
       .flatMap((ship) => Map.of(ship.get('id'), ship));

/**
 * Get the master game ship list
 * @type {function}
 * @param {ApplicationReducerState} state
 * @returns {IMap<number, Ship>}
 */
const baseShipList = (state) =>
  state.getIn(['game', 'ships'], List())
       .toMap()
       .flatMap((ship) => Map.of(ship.get('shipId'), ship));

/**
 * @type {function}
 * @param {ApplicationReducerState} state
 * @return {IMap<number, SlotItem>}
 */
const playerSlotItemList = (state) =>
  state.getIn(['player', 'slotItems'], List())
       .toMap()
       .flatMap((item) => Map.of(item.get('id'), item));

/**
 * @type {function}
 * @param {ApplicationReducerState} state
 * @return {IMap<number, SlotItem>}
 */
const baseSlotItemList = (state) =>
  state.getIn(['game', 'slotItems'], List())
       .toMap()
       .flatMap((item) => Map.of(item.get('slotItemId'), item));

/**
 * Player profile getter (null-safe)
 * @type {function}
 * @param {ApplicationReducerState} state
 * @returns {PlayerProfileRecord}
 */
const playerProfile = (state) => state.getIn(['player', 'profile'], new PlayerProfileRecord());

/**
 * Player material state getter (null-safe)
 * @type {function}
 * @param {ApplicationReducerState} state
 * @returns {MaterialStateRecord}
 */
const playerMaterials = (state) => state.getIn(['player', 'materials'], new MaterialStateRecord());

/**
 * Public-facing selectors
 **************************************/

/**
 * Usable ship list containing complete {@link ShipRecord} entities.
 * @since 0.2.0
 */
const getShipList = createSelector(
  [playerShipList, baseShipList],
  (playerShips, baseShips) =>
    playerShips.map((ship) =>
      new ShipRecord(baseShips.get(ship.get('shipId')).mergeDeep(ship)))
);

/**
 * Player slot item selector
 * @since 0.2.0
 */
export const getPlayerSlotItems = createSelector(
  [playerSlotItemList, baseSlotItemList],
  (playerSlotItems, baseSlotItems) =>
    playerSlotItems.map((item) =>
      new SlotItemRecord(baseSlotItems.get(item.get('slotItemId')).mergeDeep(item)))
);

/**
 * Player ship selector
 * @since 0.1.0
 */
export const getPlayerShips = createSelector(
  [getShipList, getPlayerSlotItems],
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
 * @since 0.2.0
 */
export const getPlayerFleets = createSelector(
  [playerFleetList, getPlayerShips],
  (fleetList, playerShipMap) => fleetList
    .map((fleet) => fleet.mergeIn(['ships'], fleet.get('ships').map((id) => playerShipMap.get(id))))
    .map((fleet) => new FleetRecord(fleet))
);

/**
 * Player profile selector
 * @since 0.1.0
 */
export const getPlayerProfile = createSelector(
  [playerProfile],
  (profile) => new PlayerProfileRecord(profile)
);

/**
 * Player material state selector
 * @since 0.1.0
 */
export const getPlayerMaterials = createSelector(
  [playerMaterials],
  (materials) => new MaterialStateRecord(materials)
);

/**
 * Player main state selector (for UI)
 * @since 0.1.0
 */
export const getPlayer = createSelector(
  [getPlayerFleets, getPlayerProfile, getPlayerMaterials, getPlayerShips, getPlayerSlotItems],
  (fleets, profile, materials, ships, slotItems) => Map({
    fleets, profile, materials, ships, slotItems
  })
);

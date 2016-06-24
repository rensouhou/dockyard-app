/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/opponent-fleet
 */
import { getObjectOrDefault as objOrDef, notEmpty } from '../primitive';
import { FleetRecord, ShipRecord, ProfileRecord } from '../../records';

/**
 * @private
 * @type {function}
 * @param {Object} o
 * @returns {Object}
 */
const opponentShip = (o) => ({
  id: o.api_id,
  shipId: o.api_ship_id,
  level: o.api_level,
  stars: o.api_star
});

/**
 * @private
 * @type {function}
 * @param {Object} o
 * @returns {ShipRecord}
 */
const asShipRecord = (o) => new ShipRecord(opponentShip(o));

/**
 * @type {function}
 * @param {Object} o
 * @returns {Object}
 */
export const opponentFleet = (o) => ({
  name: o.api_deckname,
  ships: objOrDef(o.api_deck).api_ships.filter(notEmpty).map(asShipRecord)
});

/**
 * @type {function}
 * @param {Object} o
 * @returns {FleetRecord}
 */
export const asFleetRecord = (o) => new FleetRecord(opponentFleet(o));

/**
 * @type {function}
 * @param {Object} o
 * @returns {ProfileRecord} o
 */
export const opponentProfile = (o) => ({
  id: o.api_member_id,
  level: o.api_level,
  comment: o.api_cmt,
  nickname: o.api_nickname,
  rank: o.api_rank,
  counts: {
    ships: o.api_ship,
    slotItems: o.api_slotitem
  }
});

/**
 * @type {function}
 * @param {Object} o
 * @returns {ProfileRecord}
 */
export const asProfileRecord = (o) => new ProfileRecord(opponentProfile(o));


/**
 * @overview
 *  Provides basic helper functions for common operations with records,
 *  like {@link isAbyssalShip} or {@link getShipSpeed}.
 *
 * @since 0.4.0
 */
import { cond, always, equals, T } from 'ramda';

/**
 * @type {function}
 * @param {ShipRecord} ship
 * @returns {boolean}
 */
export const isAbyssalShip = (ship) => ship.shipId >= 500 && ship.shipId <= 900;

/**
 * @type {function}
 * @param {ShipRecord} ship
 * @returns {number}
 * @todo Use less magic numbers
 */
export const getShipSpeed = (ship) => cond([
  [equals(0), always('zero')],
  [equals(5), always('five')],
  [equals(10), always('ten')],
  [T, always('fallthrough')]
])(ship.stats.speed);

/**
 * @type {function}
 * @param {FleetRecord} fleet
 * @returns {number}
 */
export const getFleetSpeed = (fleet) => fleet;

/**
 * @type {function}
 * @param {ShipRecord} ship
 * @returns {number}
 */
export const getShipLOS = (ship) => ship;

/**
 * @type {function}
 * @param {FleetRecord} fleet
 * @returns {number}
 */
export const getFleetLOS = (fleet) => fleet;

/**
 * @type {function}
 * @param {ShipRecord} ship
 * @returns {number}
 */
export const getShipRange = (ship) => ship.stats.range;

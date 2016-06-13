/**
 * @overview
 *  Convenience functions for mapping and filtering API data into
 *  primitives.
 *
 * @since 0.1.0
 */

/**
 * Returns itself or an empty `Array` if it's equal to `null` or `undefined`.
 * Helper function for null-safe access.
 * @type {Function}
 * @param {?Array} arr
 * @returns {Array}
 */
export const getArrayOrDefault = (arr) => arr || [];

/**
 * Returns itself or an empty `Object` if it's equal to `null` or `undefined`.
 * Helper function for null-safe access.
 * @type {Function}
 * @param {?Object} obj
 * @returns {Object}
 */
export const getObjectOrDefault = (obj) => obj || {};

/**
 * Check if the given value is castable to a `number`. If not a number, returns `null`.
 * @type {Function}
 * @param {?number} num
 * @returns {number|null}
 */
export const asNumber = (num) => !isNaN(parseInt(num, 10)) ? parseInt(num, 10) : null;

/**
 * Check if a number is a boolean, returns `true` if `1`, otherwise returns `false.
 * @type {Function}
 * @param {?number} n
 * @returns {boolean}
 */
export const asBool = (n) => asNumber(n) === 1;

/**
 * Check if a given value is "Kancolle API empty".
 * Usable as a simple predicate.
 * @type {Function}
 * @param {?number} n
 * @returns {boolean}
 */
export const notEmpty = (n) => asNumber(n) !== -1;

/**
 * Format a string, replacing `<br />` tags with line breaks.
 * @type {Function}
 * @param {?string} s
 * @returns {string}
 */
export const formatLineBreaks = (s) => (s || '').replace(/<br\s?\/?>/gi, '\n');

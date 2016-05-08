/*eslint no-param-reassign:0*/
/**
 * @overview
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/helpers
 */

/**
 * @param a
 * @returns {Object}
 * @constructor
 * {@link http://stackoverflow.com/a/30717598}
 */
export function Enum(a) {
  //noinspection CommaExpressionJS
  const i = Object
    .keys(a)
    .reduce((o, k) => (o[a[k]] = k, o), {});

  //noinspection CommaExpressionJS
  return Object.freeze(
    Object.keys(a).reduce(
      (o, k) => (o[k] = a[k], o), v => i[v]
    )
  );
}

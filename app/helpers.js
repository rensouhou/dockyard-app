/* eslint no-param-reassign:0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */

/**
 * @param a
 * @returns {Object}
 * @constructor
 * {@link http://stackoverflow.com/a/30717598}
 */
export function Enum(a) {
  // noinspection CommaExpressionJS
  const i = Object
    .keys(a)
    .reduce((o, k) => (o[a[k]] = k, o), {});

  // noinspection CommaExpressionJS
  return Object.freeze(
    Object.keys(a).reduce(
      (o, k) => (o[k] = a[k], o), v => i[v]
    )
  );
}

/**
 * @param obj
 */
export function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

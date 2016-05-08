/* eslint no-param-reassign:0 */
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

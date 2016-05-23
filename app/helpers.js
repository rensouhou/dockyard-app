/* eslint no-param-reassign:0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import R from 'ramda';
import m from 'monet';

const { Maybe } = m;
const { path, isEmpty } = R;

/**
 * @param obj
 * @param propPath
 * @returns {Maybe<*>}
 */
export const getMaybe = (obj, ...propPath) => {
  const d = path(propPath, obj);
  return isEmpty(d)
    ? Maybe.None()
    : Maybe.Some(d);
};

/**
 * Creates a null-safe monadic property getter.
 * Implements a "monadic pluck", e.g. creates a simple key getter
 * wrapped in a `Maybe` for use as an applicative (@see {@link Maybe#ap})
 *
 * @param key
 * @returns {Maybe}
 */
export const getKeyAp = key => Maybe.Some(it => it[key]);

/**
 * Get the specified key `k` from the given `Maybe`.
 * The value of `M` must be something that can be picked by index and/or key.
 *
 * @param {Maybe} M
 * @param {string} k
 * @returns {Maybe}
 */
export const getFromM = (M, k) => M.ap(getKeyAp(k));

/**
 * Get the specified key `k` from the given `Maybe`, or return `def` in case
 * the result of getting `M[k]` is `None`.
 *
 * @param {Maybe} M
 * @param {string} k
 * @param {Iterable} def
 */
export const getWithDefault = (M, k, def) => getFromM(M, k).orSome(def);

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

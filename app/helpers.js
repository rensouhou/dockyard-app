/* eslint no-param-reassign: 0, no-return-assign: 0, no-sequences: 0 */
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
const { path, pathOr, isEmpty } = R;

/**
 * @template T
 * @param {?Array<T>} obj
 * @param {!string[]} objPath
 * @returns {Array<T>}
 */
export const listOrDefault = (obj, ...objPath) => pathOr([], objPath, obj);

/**
 * @template T, U
 * @param {?Object<T, U>} obj
 * @param {!string[]} objPath
 * @returns {Object<T, U>}
 */
export const objOrDefault = (obj, ...objPath) => pathOr({}, objPath, obj);

/**
 * @template T
 * @param obj
 * @param propPath
 * @returns {Maybe<T>}
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
 * @returns {Maybe<T>}
 */
export const getKeyAp = key => Maybe.Some(it => it[key]);

/**
 * Get the specified key `k` from the given `Maybe`.
 * The value of `M` must be something that can be picked by index and/or key.
 *
 * @param {Maybe<T>} M
 * @param {string} k
 * @returns {Maybe<T>}
 */
export const getFromM = (M, k) => M.ap(getKeyAp(k));

/**
 * Get the specified key `k` from the given `Maybe`, or return `def` in case
 * the result of getting `M[k]` is `None`.
 *
 * @param {Maybe<T>} M
 * @param {string} k
 * @param {Iterable<T>} def
 */
export const getWithDefault = (M, k, def) => getFromM(M, k).orSome(def);

/**
 * @external {Enum} http://stackoverflow.com/a/30717598
 * @param {Object} enumObj
 * @returns {Enum}
 * @constructor
 */
export function Enum(enumObj) {
  // noinspection CommaExpressionJS
  const i = Object
    .keys(enumObj)
    .reduce((o, k) => (o[enumObj[k]] = k, o), {});

  // noinspection CommaExpressionJS
  return Object.freeze(
    Object.keys(enumObj).reduce(
      (o, k) => (o[k] = enumObj[k], o), v => i[v]
    )
  );
}

/**
 * @param {!Object} obj
 * @returns {GeneratorFunction}
 */
export function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

/**
 * @param {Object} props
 * @param {string} name
 */
export const logProps = (props, name = 'Component') => {
  console.groupCollapsed(name);
  console.log('props\t=>', props);
  console.groupEnd();
};

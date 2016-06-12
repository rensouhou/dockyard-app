/* eslint no-else-return: 0 */
/**
 * @since 0.1.0
 */

/**
 * @param {*} initialState
 * @param {Object} handlers
 * @returns {reducer}
 */
export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    else {
      return state;
    }
  };
}

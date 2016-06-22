/* eslint no-else-return: 0 */
/**
 * @param {*} initialState
 * @param {Object} handlers
 * @returns {reducer}
 * @since 0.1.0
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

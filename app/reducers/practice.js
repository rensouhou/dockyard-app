/// <reference path="../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/practice
 */
import { deepMerge } from '../transformers/utils';
import createReducer from './create-reducer';
import { ApiEvents } from '../actions/game';

const initialState = {
  opponents: {}
};

/** @deprecated */
const upsertOpponent = (opponentObj, o) => ({ ...opponentObj, o });

export default createReducer(initialState, {
  [ApiEvents.GET_OPPONENT_INFO](state, action) {
    const opponents = {
      ...state.opponents,
      ...{ [action.payload.id]: deepMerge(action.payload) }
    };

    return { ...state, ...{ opponents } };
  }
});

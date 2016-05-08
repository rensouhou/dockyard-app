/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers/mission
 */
import R from 'ramda';
import createReducer from './create-reducer';
import { ApiEvents } from '../actions/game';

const initialState = {
  active: {}
};

const startMission = (data, state) => R.merge(state, data);
const completeMission = (data, state) => R.merge(state, data);

const reducerActions = {
  /**
   * @param state
   * @param {Dockyard.API.StartMission} action
   */
  [ApiEvents.START_MISSION](state, action) {
    return startMission({ [action.payload.fleetId]: action.payload.completion }, state);
  },
  /**
   * @param state
   * @param {Dockyard.API} action
   */
  [ApiEvents.COMPLETE_MISSION](state, action) {
    return completeMission({ [action.payload.fleetId]: null }, state);
  }
};

export default createReducer(initialState, reducerActions);

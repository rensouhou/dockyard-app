/* eslint-disable */
import { expect } from 'chai';
import { createAction } from 'redux-actions';
import player, { _initialState } from '../../app/reducers/player';
import { actionHandlers, findEvent } from '../../app/actions/api-actions';
import { ApiEvents } from '../../app/constants';
import { MaterialStateRecord } from '../../app/records';

let undef;
const initialState = _initialState;

describe('reducers', () => {
  describe('player', () => {
    /**
     * @test
     */
    it('should handle initial state', () => {
      expect(player(undef, {})).to.equal(_initialState);
    });

    /**
     * @test
     */
    it('should handle the `GET_MATERIAL` event', () => {
      const materialState = () => new MaterialStateRecord({
        fuel: 100,
        ammo: 100,
        steel: 200,
        bauxite: 50
      });

      const expected = _initialState.mergeIn(['materials'], materialState()).toJS();
      const actual = player(undef, {
        type: ApiEvents.GET_MATERIAL,
        payload: {
          materials: materialState().toObject()
        }
      }).toJS();

      expect(expected).to.deep.equal(actual);
    })
  });
});

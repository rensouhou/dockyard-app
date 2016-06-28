/* eslint-disable */
import { expect } from 'chai';
import { Iterable } from 'immutable';
import player, { _initialState } from '../../app/reducers/player';
import { ApiEvents } from '../../app/constants';
import { MaterialStateRecord } from '../../app/records';

let undef;

describe('reducers/player', () => {
  it('should handle initial state', () => {
    expect(player(undef, {})).to.equal(_initialState);
  });

  it('should use an immutable state object', () => {
    expect(player(undef, {})).to.be.an.instanceOf(Iterable);
  });

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

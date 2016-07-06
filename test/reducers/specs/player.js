/* eslint-disable */
import { expect } from 'chai';
import { Iterable } from 'immutable';
import player, { _initialState } from '../../../app/reducers/player';
import { ApiEvents } from '../../../app/constants';
import { MaterialStateRecord } from '../../../app/records';

let undef;

describe('player', () => {
  it('handles initial state', () => {
    expect(player(undef, {})).to.equal(_initialState);
  });

  it('uses an immutable state object', () => {
    expect(player(undef, {})).to.be.an.instanceOf(Iterable);
  });

  it('handles the `GET_MATERIAL` event', () => {
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

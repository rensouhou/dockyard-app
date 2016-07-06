/* eslint-disable */
/**
 * @overview
 * @since 0.3.0
 */
import { expect } from 'chai';
import { Iterable } from 'immutable';
import opponent, { _initialState } from '../../../app/reducers/opponent';

let undef;

describe('opponent', () => {
  it('handles initial state', () => {
    expect(opponent(undef, {})).to.equal(_initialState);
  });

  it('uses an immutable state object', () => {
    expect(opponent(undef, {})).to.be.an.instanceOf(Iterable);
  });
});

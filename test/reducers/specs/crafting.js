/* eslint-disable */
/**
 * @overview
 * @since 0.3.0
 */
import { expect } from 'chai';
import { Iterable } from 'immutable';
import crafting, { _initialState } from '../../../app/reducers/crafting';

let undef;

describe('crafting', () => {
  it('handles initial state', () => {
    expect(crafting(undef, {})).to.equal(_initialState);
  });

  it('uses an immutable state object', () => {
    expect(crafting(undef, {})).to.be.an.instanceOf(Iterable);
  })
});

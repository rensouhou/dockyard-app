/* eslint-disable */
/**
 * @overview
 * @since 0.3.0
 */
import { expect } from 'chai';
import { Iterable } from 'immutable';
import crafting, { _initialState } from '../../app/reducers/crafting';

let undef;

describe('reducers/crafting', () => {
  it('should handle initial state', () => {
    expect(crafting(undef, {})).to.equal(_initialState);
  });

  it('should use an immutable state object', () => {
    expect(crafting(undef, {})).to.be.an.instanceOf(Iterable);
  })
});

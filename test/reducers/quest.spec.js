/* eslint-disable */
/**
 * @overview
 * @since 0.3.0
 */
import { expect } from 'chai';
import { Iterable } from 'immutable';
import quest, { _initialState } from '../../app/reducers/quest';

let undef;

describe('reducers/quest', () => {
  it('should handle initial state', () => {
    expect(quest(undef, {})).to.equal(_initialState);
  });

  it('should use an immutable state object', () => {
    expect(quest(undef, {})).to.be.an.instanceOf(Iterable);
  })
});

/* eslint-disable */
/**
 * @overview
 * @since 0.3.0
 */
import { expect } from 'chai';
import { Iterable } from 'immutable';
import game, { _initialState } from '../../../app/reducers/game';

let undef;

describe('game', () => {
  it('handles initial state', () => {
    expect(game(undef, {})).to.equal(_initialState);
  });

  it('uses an immutable state object', () => {
    expect(game(undef, {})).to.be.an.instanceOf(Iterable);
  })
});

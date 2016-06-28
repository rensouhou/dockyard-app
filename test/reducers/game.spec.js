/* eslint-disable */
/**
 * @overview
 * @since 0.3.0
 */
import { expect } from 'chai';
import { Iterable } from 'immutable';
import game, { _initialState } from '../../app/reducers/game';

let undef;

describe('reducer', () => {
  describe('game', () => {
    it('should handle initial state', () => {
      expect(game(undef, {})).to.equal(_initialState);
    });

    it('should use an immutable state object', () => {
      expect(game(undef, {})).to.be.an.instanceOf(Iterable);
    })
  });
});

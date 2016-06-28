/* eslint-disable */
/**
 * @overview
 * @since 0.3.0
 */
import { expect } from 'chai';
import { Iterable } from 'immutable';
import opponent, { _initialState } from '../../app/reducers/opponent';

let undef;

describe('reducer', () => {
  describe('opponent', () => {
    it('should handle initial state', () => {
      expect(opponent(undef, {})).to.equal(_initialState);
    });

    it('should use an immutable state object', () => {
      expect(opponent(undef, {})).to.be.an.instanceOf(Iterable);
    });
  });
});

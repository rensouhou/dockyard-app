/**
 * @overview
 * @since 0.4.0
 */
import { expect } from 'chai';
import { spy } from 'sinon';
import { findEvent } from '../../../app/actions/api-actions';
import { ApiEventPaths, ApiEvents } from '../../../app/constants';

describe('api-actions', () => {
  describe('event lookup', () => {
    it('finds the correct event 1/2', () => {
      expect(findEvent('/api_start2')).to.equal(ApiEvents.INITIALIZE_GAME);
    });

    it('finds the correct event 2/2', () => {
      expect(findEvent(ApiEventPaths.get(ApiEvents.FINISHED_PRACTICE))).to.equal(ApiEvents.FINISHED_PRACTICE);
      expect(findEvent(ApiEventPaths.get(ApiEvents.SORTIE_STAGE))).to.equal(ApiEvents.SORTIE_STAGE);
    });
  });
});

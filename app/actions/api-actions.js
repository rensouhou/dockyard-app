/**
 * @overview
 *  Proposal for unifying API actions and constants into one place.
 *  Requirements are to support extra flags/data to deliver to whatever handler is taking care.
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/actions/api-actions
 */
import kcsapiHandlers from '../transformers/kcsapi';

const example = {
  path: '/api_start2',
  event: 'INITIALIZE_GAME',
  handler: kcsapiHandlers.INITIALIZE_GAME,
  flags: {
    triggerCore: true
  }
};

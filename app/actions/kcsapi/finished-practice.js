/**
 * @overview
 *  Handler for `FINISHED_PRACTICE` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { createGameActionHandler } from './_action-handler';

const FINISHED_PRACTICE = ({ body, postBody }) => ({ body, postBody });

export default createGameActionHandler(FINISHED_PRACTICE, { warn: true });

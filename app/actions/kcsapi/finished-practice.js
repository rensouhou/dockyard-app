/**
 * @overview
 *  Handler for `FINISHED_PRACTICE` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { gameActionHandler } from './_action-handler';

const FINISHED_PRACTICE = (r) => ({ r });

export default gameActionHandler(FINISHED_PRACTICE, { warn: true });

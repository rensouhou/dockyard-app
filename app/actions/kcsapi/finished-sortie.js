/**
 * @overview
 *  Handler for the `FINISHED_SORTIE` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { sortieResult } from '../../transformers/api/sortie-result';
import { createGameActionHandler } from './_action-handler';

/**
 * @event FINISHED_SORTIE
 */
const finishedSortieHandler = (r) => ({
  result: sortieResult(r.body)
});

export default createGameActionHandler('FINISHED_SORTIE', finishedSortieHandler, { warn: true });


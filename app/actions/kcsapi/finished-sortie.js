/**
 * @overview
 *  Handler for the `FINISHED_SORTIE` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { sortieResult } from '../../transformers/api/sortie-result';

export default function ({ body }) {
  return {
    result: sortieResult(body)
  };
}


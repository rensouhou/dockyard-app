/**
 * @overview
 *  Handler for the `FINISHED_SORTIE` event
 *
 * @since 0.1.0
 */
import { sortieResult } from '../../transformers/api/sortie-result';

export default function FINISHED_SORTIE({ body }) {
  return {
    result: sortieResult(body)
  };
}


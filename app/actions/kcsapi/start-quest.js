/**
 * @overview
 *  Handler for `START_QUEST` action
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import { asNumber } from '../../transformers/primitive';

export default function START_QUEST({ postBody }) {
  return {
    quest: {
      id: asNumber(postBody.api_quest_id)
    }
  };
}

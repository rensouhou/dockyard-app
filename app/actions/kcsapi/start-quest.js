/**
 * @overview
 *  Handler for `START_QUEST` action
 *
 * @since 0.1.0
 */
import { asNumber } from '../../transformers/primitive';

export default function START_QUEST({ postBody }) {
  return {
    quest: {
      id: asNumber(postBody.api_quest_id)
    }
  };
}

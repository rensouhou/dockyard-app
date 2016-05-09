/**
 * @overview
 *  Handler for `COMPLETE_QUEST` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { asNumber } from '../../transformers/primitive';
import { parseMaterialArray } from '../../transformers/api/materials';

export default function ({ body, postBody }) {
  return {
    id: asNumber(postBody.api_quest_id),
    materials: parseMaterialArray(body.api_material),
    rewards: {
      count: body.api_bounus_count,
      items: body.api_bounus
    }
  }
}

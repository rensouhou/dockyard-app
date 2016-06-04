/**
 * @overview
 *  Handler for `COMPLETE_QUEST` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { asNumber } from '../../transformers/primitive';
import { parseMaterialArray, asRecord } from '../../transformers/api/materials';

export default function COMPLETE_QUEST({ body, postBody }) {
  return Map({
    id: asNumber(postBody.api_quest_id),
    materials: asRecord(parseMaterialArray(body.api_material)),
    rewards: {
      count: body.api_bounus_count,
      items: body.api_bounus
    }
  });
}

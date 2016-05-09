/**
 * @overview
 *  Handler for `COMPLETE_QUEST` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { createGameActionHandler } from './_action-handler';
import { asNumber } from '../../transformers/primitive';
import { parseMaterialArray } from '../../transformers/api/materials';

const COMPLETE_QUEST = ({ body, postBody }) => ({
  id: asNumber(postBody.api_quest_id),
  materials: parseMaterialArray(body.api_material),
  rewards: {
    count: body.api_bounus_count,
    items: body.api_bounus
  }
});

export default createGameActionHandler(COMPLETE_QUEST);

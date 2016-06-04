/**
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/quest
 */
import { Quest } from '../../records';
import { parseMaterialArray, asRecord } from '../api/materials';

/**
 * @param {KCS.Models.Quest} q
 * @returns {Dockyard.Quests.Quest}
 */
export const quest = (q) => new Quest({
  id: q.api_no,
  type: q.api_type,
  category: q.api_category,
  state: q.api_state,
  title: q.api_title,
  detail: q.api_detail,
  reward: asRecord(parseMaterialArray(q.api_get_material)),
  progress: q.api_progress_flag
});

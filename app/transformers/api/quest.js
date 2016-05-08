/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/quest
 */
import { parseMaterialArray } from '../api/materials';

/**
 * @param {KCS.Models.Quest} q
 * @returns {Dockyard.Quests.Quest}
 */
export const quest = (q) => ({
  id: q.api_no,
  type: q.api_type,
  category: q.api_category,
  state: q.api_state,
  title: q.api_title,
  detail: q.api_detail,
  reward: parseMaterialArray(q.api_get_material),
  progress: q.api_progress_flag
});

/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/construction-dock
 */
import { parseMaterialsRecipe } from '../api/materials';

export const constructionDock = o => ({
  id: o.api_id,
  completionTime: o.api_complete_time,
  shipId: o.api_created_ship_id,
  recipe: parseMaterialsRecipe([o.api_item1, o.api_item2, o.api_item3, o.api_item4, null, null, o.api_item5]),
  state: o.api_state,
  $_unknown: {
    completionTimeStr: o.api_complete_time_str
  },
  $_finalized: false
});

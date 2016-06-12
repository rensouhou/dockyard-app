/**
 * @overview
 *
 * @since 0.1.0
 * @todo Implement `constructionDock.state`
 */
import { Dock } from '../../records';
import { asNumber } from '../primitive';
import { parseMaterialsRecipe, asRecord } from '../api/materials';

export const constructionDock = (o) => ({
  id: asNumber(o.api_id),
  completionTime: asNumber(o.api_complete_time),
  shipId: asNumber(o.api_created_ship_id),
  recipe: asRecord(parseMaterialsRecipe(
    [o.api_item1, o.api_item2, o.api_item3, o.api_item4, null, null, o.api_item5])),
  state: o.api_state
});

export const constructionDockAsRecord = (o) => new Dock(constructionDock(o));

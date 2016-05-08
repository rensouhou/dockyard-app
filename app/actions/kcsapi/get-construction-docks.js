/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Handler for `GET_CONSTRUCTION_DOCKS` event
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/get-construction-docks
 */
import R from 'ramda';
import { parseMaterialsRecipe } from '../../transformers/api/materials';
import { Enum } from '../../helpers';

// @todo(@stuf): pls
const range = R.range(1, 6);
const apiItems = R.map(it => `api_item${it}`, range);
const getRecipe = R.props(apiItems);
const padList = R.insertAll(4, [null, null]);

const State = Enum({
  LOCKED: -1,
  EMPTY: 0,
  UNDER_CONSTRUCTION: 2,
  COMPLETE: 3
});

/**
 * @param {KCS.Models.ConstructionDock} dock
 */
const parseDock = dock => ({
  id: dock.api_id,
  completionTime: dock.api_complete_time,
  shipId: dock.api_created_ship_id,
  materials: parseMaterialsRecipe(padList(getRecipe(dock))),
  state: State(dock.api_state)
});

/**
 * @param {KCSApi.API.GET_CONSTRUCTION_DOCKS} r
 * @event GET_CONSTRUCTION_DOCKS
 */
export default function action$getConstructionDocks(r) {
  return {
    docks: r.body.map(parseDock)
  };
}

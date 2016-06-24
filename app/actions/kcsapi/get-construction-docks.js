/**
 * @overview
 *  Handler for `GET_CONSTRUCTION_DOCKS` event
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { fromJS } from 'immutable';
import { parseMaterialsRecipe, asRecord } from '../../transformers/api/materials';
import { Enum } from '../../helpers';

// @todo This "works" but isn't really too understandable.
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
 * @param {Object} dock
 * @return {Dock}
 */
const parseDock = (dock) => ({
  id: dock.api_id,
  completionTime: dock.api_complete_time,
  shipId: dock.api_created_ship_id,
  materials: asRecord(parseMaterialsRecipe(padList(getRecipe(dock)))),
  state: State(dock.api_state)
});

/**
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function GET_CONSTRUCTION_DOCKS(apiAction) {
  const { body } = apiAction;
  return fromJS({
    docks: body.map(parseDock)
  });
}

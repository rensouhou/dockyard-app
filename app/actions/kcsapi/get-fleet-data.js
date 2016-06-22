/**
 * @overview
 */
import { List, fromJS } from 'immutable';
import { asFleetRecord } from '../../transformers/api/player-fleet';

/**
 * @param {ApiActionRecord} p
 * @returns {any}
 * @constructor
 */
export default function GET_FLEET_DATA(p) {
  const { body } = p;
  return fromJS({
    fleets: List(body).map(asFleetRecord)
  });
}

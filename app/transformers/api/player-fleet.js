/**
 * @overview
 *
 * @since 0.1.0
 */
import { fromJS } from 'immutable';
import { notEmpty, getArrayOrDefault } from '../primitive';
import { FleetRecord } from '../../records';
import { mission } from './mission';

/**
 * @type {function}
 * @param {Object} d
 * @returns {IMap<string, *>}
 */
export const playerFleet = (d) => fromJS({
  flagship: d.api_flagship,
  id: d.api_id,
  memberId: d.api_member_id,
  mission: mission(d.api_mission),
  name: d.api_name,
  ships: getArrayOrDefault(d.api_ship).filter(notEmpty)
});

/**
 * @type {function}
 * @param {Object} d
 * @returns {FleetRecord}
 */
export const asFleetRecord = (d) => new FleetRecord(playerFleet(d));

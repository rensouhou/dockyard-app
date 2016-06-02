/**
 * @overview
 *
 * @since 0.1.0
 */
import { notEmpty, getArrayOrDefault } from '../primitive';
import { mission } from './mission';
import { Fleet } from '../../records';

/**
 * @param {KCS.Models.Fleet} d
 * @returns {Dockyard.PlayerData.Fleet}
 */
export const playerFleet = (d) => new Fleet({
  flagship: d.api_flagship,
  id: d.api_id,
  memberId: d.api_member_id,
  mission: mission(d.api_mission),
  name: d.api_name,
  ships: getArrayOrDefault(d.api_ship).filter(notEmpty)
});

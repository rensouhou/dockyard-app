/**
 * @overview
 *
 * @since 0.2.0
 */
import { Enum } from '../../helpers';
import { asNumber } from '../primitive';

/**
 * Enum for the map area's type
 * @type {Enum}
 * @since 0.2.0
 */
const MapAreaType = Enum({
  NORMAL: 0,
  EVENT: 1
});

/**
 * Map area
 *
 * @type {Function}
 * @param {Object} o
 * @return {Object}
 * @since 0.2.0
 */
export const mapArea = (o) => ({
  id: asNumber(o.api_id),
  name: o.api_name,
  type: MapAreaType(o.api_type)
});

/**
 * Map info
 *
 * Unused or unknown attributes:
 * - `api_max_maxhp`
 * - `api_required_defeat_count`
 * - `api_sally_flag`
 *
 * @type {Function}
 * @param {!Object} o
 * @return {Object}
 * @since 0.1.0
 * @version 0.2.0
 */
export const mapInfo = (o) => ({
  id: asNumber(o.api_id),
  worldId: asNumber(o.api_maparea_id),
  areaId: asNumber(o.api_no),
  name: o.api_name,
  level: o.api_level,
  operationText: o.api_opetext,
  infoText: o.api_infotext,
  reward: o.api_item
});

/**
 * @type {Function}
 * @param {!Object} o
 * @returns {Object}
 * @since 0.2.0
 */
export const mapBgm = (o) => ({
  id: asNumber(o.api_id),
  worldId: asNumber(o.api_maparea_id),
  areaId: asNumber(o.api_no),
  mapBgm: asNumber(o.api_map_bgm),
  bossBgmId: asNumber(o.api_boss_bgm)
});

/**
 * Note: Most likely NOT final, as certain node types are not 100% accurate.
 * Node types `AIR_NODE` (9) and `AIR_RAID_NODE` (10) need some attention.
 * @type {Enum}
 * @since 0.2.0
 * @version 0.2.0
 */
const MapCellType = Enum({
  START_NODE: 0,
  EMPTY: 1,
  RESOURCE_NODE: 2,
  WHIRLPOOL_NODE: 3,
  BATTLE_NODE: 4,
  BOSS_NODE: 5,
  IMAGINATION_OR_UNLOAD_NODE: 6,
  AIR_BATTLE_NODE: 7,
  FLEET_ESCORT_SUCCESS_NODE: 8,
  AIR_NODE: 9,
  AIR_RAID_NODE: 10
});

/**
 * @type {Function}
 * @param {!Object} o
 * @returns {Object}
 * @since 0.2.0
 */
export const mapCell = (o) => ({
  cellId: asNumber(o.api_map_no),
  worldId: asNumber(o.api_maparea_id),
  areaId: asNumber(o.api_mapinfo_no),
  id: asNumber(o.api_id),
  cellNo: o.api_no,
  type: MapCellType(o.api_color_no)
});

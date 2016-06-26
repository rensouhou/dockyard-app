/* eslint camelcase: 0, prefer-arrow-callback: 0 */
/**
 * @overview
 *  Handler for `INITIALIZE_GAME` event
 *
 * @since 0.1.0
 */
import { Map, Seq, fromJS } from 'immutable';
import { baseSlotItem } from '../../transformers/api/base-slotitem';
import { baseFurniture } from '../../transformers/api/base-furniture';
import { baseMission } from '../../transformers/api/base-mission';
import { baseBgm } from '../../transformers/api/base-bgm';
import {
  mapArea as baseMapArea,
  mapBgm as baseMapBgm,
  mapCell as baseMapCell,
  mapInfo as baseMapInfo
} from '../../transformers/api/base-map';
import { baseShip, baseShipType, baseShipGraphic } from '../../transformers/api/base-ship';

const groupBy = (id, list) => Seq.Indexed(list)
                                 .toKeyedSeq()
                                 .flatMap(((it) => Map.of(it[id], it)));

/**
 * Handler for the `INITIALIZE_GAME` API event
 *
 * @name INITIALIZE_GAME
 * @param {ApiActionRecord} apiAction
 * @returns {ApiActionResult}
 * @constructor
 * @since 0.1.0
 * @version 0.2.0
 */
export default function INITIALIZE_GAME(apiAction) {
  const { body } = apiAction;
  return fromJS({
    ships: body.api_mst_ship.map(baseShip),
    shipGraphics: body.api_mst_shipgraph.map(baseShipGraphic),
    shipTypes: body.api_mst_stype.map(baseShipType),
    slotItems: body.api_mst_slotitem.map(baseSlotItem),
    missions: body.api_mst_mission.map(baseMission),
    furniture: body.api_mst_furniture.map(baseFurniture),
    mapAreas: body.api_mst_maparea.map(baseMapArea),
    mapBgms: body.api_mst_mapbgm.map(baseMapBgm),
    mapInfos: body.api_mst_mapinfo.map(baseMapInfo),
    mapNodes: body.api_mst_mapcell.map(baseMapCell),
    bgm: body.api_mst_bgm.map(baseBgm)
  });
}

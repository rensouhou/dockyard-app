/* eslint camelcase: 0, prefer-arrow-callback: 0 */
/**
 * @overview
 *  Handler for `INITIALIZE_GAME` event
 *
 * @since 0.1.0
 */
import { Map, List } from 'immutable';
import { baseShip } from '../../transformers/api/base-ship';
import { baseShipGraphic } from '../../transformers/api/base-ship-graphic';
import { baseShipType } from '../../transformers/api/base-ship-types';
import { baseSlotItem } from '../../transformers/api/base-slotitem';
import { baseFurniture } from '../../transformers/api/base-furniture';
import { baseMission } from '../../transformers/api/base-mission';
import {
  mapArea as baseMapArea,
  mapBgm as baseMapBgm,
  mapCell as baseMapCell,
  mapInfo as baseMapInfo
} from '../../transformers/api/base-map';

/**
 * @type {Dockyard.GameEvent.transformer}
 */
export default function INITIALIZE_GAME({ body }) {
  return Map({
    ships: List(body.api_mst_ship).map(baseShip),
    shipGraphics: List(body.api_mst_shipgraph).map(baseShipGraphic),
    shipTypes: List(body.api_mst_stype).map(baseShipType),
    slotItems: List(body.api_mst_slotitem).map(baseSlotItem),
    missions: List(body.api_mst_mission).map(baseMission),
    furniture: List(body.api_mst_furniture).map(baseFurniture),
    mapAreas: List(body.api_mst_maparea).map(baseMapArea),
    mapBgms: List(body.api_mst_mapbgm).map(baseMapBgm),
    mapInfos: List(body.api_mst_mapinfo).map(baseMapInfo),
    mapNodes: List(body.api_mst_mapcell).map(baseMapCell)
  });
}

/* eslint camelcase: 0, prefer-arrow-callback: 0 */
/**
 * @overview
 *  Handler for `INITIALIZE_GAME` event
 *
 * @since 0.1.0
 */
import R from 'ramda';
import { baseShip } from '../../transformers/api/base-ship';
import { baseShipGraphic } from '../../transformers/api/base-ship-graphic';
import { baseShipType } from '../../transformers/api/base-ship-types';
import { baseSlotItem } from '../../transformers/api/base-slotitem';
import { baseFurniture } from '../../transformers/api/base-furniture';
import { baseMapArea } from '../../transformers/api/base-maparea';
import { baseMission } from '../../transformers/api/base-mission';
import { normalize, Schema } from 'normalizr';

/**
 * @type {Dockyard.GameEvent.transformer}
 */
export default function INITIALIZE_GAME({ body }) {
  const {
          api_mst_shipgraph,
          api_mst_shipupgrade,
          api_msg_slotitem_equiptype,
          api_mst_equip_exslot,
          api_mst_stype,
          api_mst_furniture,
          api_mst_furnituregraph,
          api_mst_useitem,
          api_mst_payitem,
          api_mst_item_shop,
          api_mst_maparea,
          api_mst_mapinfo,
          api_mst_mapbgm,
          api_mst_mapcell,
          api_mst_const,
          api_mst_bgm,
        } = body;

  const response = {
    ships: R.map(baseShip, body.api_mst_ship)
  };

  const transformedResult = {
    ships: body.api_mst_ship.map(baseShip),
    shipGraphics: body.api_mst_shipgraph.map(baseShipGraphic),
    shipTypes: body.api_mst_stype.map(baseShipType),
    slotItems: body.api_mst_slotitem.map(baseSlotItem),
    missions: body.api_mst_mission.map(baseMission),
    furniture: body.api_mst_furniture.map(baseFurniture),
    mapAreas: body.api_mst_maparea.map(baseMapArea)
  };

  const schemas = {
    ships: new Schema('ships'),
    shipTypes: new Schema('shiptypes'),
    slotItems: new Schema('slotItems'),
    missions: new Schema('missions'),
    furniture: new Schema('furniture'),
    mapArea: new Schema('mapAreas')
  };

  return {
    normalized: normalize(response, schemas),
    ...transformedResult
  };
}

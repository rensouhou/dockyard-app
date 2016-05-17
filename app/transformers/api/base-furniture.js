/**
 * @overview
 *
 * @since 0.1.0
 */
import { Enum } from '../../helpers';
import { asNumber, asBool } from '../primitive';

const FurnitureType = Enum({
  FLOOR: 0,
  WALLPAPER: 1,
  WINDOW: 2,
  WALL_DECORATION: 3,
  FURNITURE: 4,
  DESK: 5
});

export const baseFurniture = ({ body }) => ({
  id: asNumber(body.api_id),
  title: body.api_title,
  description: body.api_description,
  price: asNumber(body.api_price),
  rarity: asNumber(body.api_rarity),
  type: FurnitureType(asNumber(body.api_type)),
  sale: asBool(body.api_saleflg),
  season: asNumber(body.api_season)
});

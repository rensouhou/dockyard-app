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

export const baseFurniture = o => ({
  id: asNumber(o.api_id),
  title: o.api_title,
  description: o.api_description,
  price: asNumber(o.api_price),
  rarity: asNumber(o.api_rarity),
  type: FurnitureType(asNumber(o.api_type)),
  sale: asBool(o.api_saleflg),
  season: asNumber(o.api_season)
});

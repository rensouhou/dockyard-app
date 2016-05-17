/**
 * @overview
 *
 * @since 0.1.0
 */
import { asNumber } from '../primitive';
import { Enum } from '../../helpers';

const MapAreaType = Enum({
  NORMAL: 0,
  EVENT: 1
});

export const baseMapArea = o => ({
  id: asNumber(o.api_id),
  name: o.api_name,
  type: MapAreaType(asNumber(o.api_type))
});

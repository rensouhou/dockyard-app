import { asNumber } from '../primitive';

/**
 * @todo(@stuf): document
 * @param o
 */
export const baseShipGraphic = (o) => ({
  id: asNumber(o.api_id),
  sortId: asNumber(o.api_sortno),
  filename: o.api_filename,
  version: o.api_version,
  $_finalized: false
});

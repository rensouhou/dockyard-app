/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/base-ship-graphic
 */
import { asNumber } from '../primitive';

const baseShipGraphic = (o) => {
  const {
          api_id,
          api_sortno,
          api_filename,
          api_version,
          ...rest
        } = o;

  return {
    id: asNumber(api_id),
    sortId: asNumber(api_sortno),
    filename: api_filename,
    version: api_version,
    $_unused: rest,
    $_finalized: false,
  };
};

export { baseShipGraphic };

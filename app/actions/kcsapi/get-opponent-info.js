/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/kcsapi/get-opponent-info
 *
 * @todo(@stuf): logging of seen opponents
 * @todo(@stuf): display if opponent seen at an earlier time (probably needs some time lookup magic)
 */
import { opponentFleet } from '../../transformers/api/opponent-fleet';

/**
 * @event GET_OPPONENT_INFO
 * @param {__PROTO.ApiRequest} r
 */
export default function action$getOpponentInfo(r) {
  return {
    fleet: opponentFleet(r.body)
  };
}

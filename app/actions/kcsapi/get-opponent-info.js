/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
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

/**
 * @overview
 *  Handler for the `GET_OPPONENT_INFO` event
 *
 * @since 0.1.0
 */
import { opponentFleet } from '../../transformers/api/opponent-fleet';

/**
 * @event GET_OPPONENT_INFO
 * @param {__PROTO.ApiRequest} r
 */
export default function GET_OPPONENT_INFO({ body }) {
  return {
    fleet: opponentFleet(body)
  };
}

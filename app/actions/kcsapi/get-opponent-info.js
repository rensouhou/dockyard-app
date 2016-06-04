/**
 * @overview
 *  Handler for the `GET_OPPONENT_INFO` event
 *
 * @since 0.1.0
 */
import { Map } from 'immutable';
import { opponentFleet } from '../../transformers/api/opponent-fleet';

export default function GET_OPPONENT_INFO({ body }) {
  return Map({
    fleet: opponentFleet(body)
  });
}

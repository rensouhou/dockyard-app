/**
 * @overview
 *
 * @since 0.1.0
 */
import { fleets } from './player';

export default function getUiState(state) {
  return {
    player: {
      ...fleets(state)
    }
  };
}

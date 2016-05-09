/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { playerSlotItem } from '../../transformers/api/player-slotitem';

export default function ({ body }) {
  return {
    slotItems: body.map(playerSlotItem)
  };
}

/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { createSelector } from 'reselect';

const getFleets = state => state.player.fleets;

export const combineFleets = createSelector(
  [getFleets],
  fleets => fleets
);

/* eslint no-param-reassign: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import S from 'sanctuary';
import { createSelector } from 'reselect';
import { normalizeShips } from './player-entities';

const { path, pathOr, map, reduce } = R;
const { Maybe, Just, Nothing } = S;

const playerFleetList = state => path(['player', 'fleets'], state) || [];

export const playerFleets = createSelector(
  [playerFleetList, normalizeShips],
  (fleetList, shipEntities) => map(it => {
    console.log('fleetReduceFn =>', it);
    return {
      ...it,
      shipsM: reduce((acc, shipId) => [...acc, shipEntities[shipId]], [], pathOr([], ['ships'], it))
    };
  }, fleetList)
);

/**
 * @overview
 * @since 0.3.0
 * @module app/selectors/opponent
 */
import { createSelector } from 'reselect';
import { List, Map } from 'immutable';
import { getBaseShipList } from './base';
import { ShipRecord } from '../records';

const opponentFleet = (state) => state.getIn(['opponent', 'fleet'], Map());

const opponentShips = (state) => state.getIn(['opponent', 'fleet', 'ships'], List());

export const getOpponentShipList = createSelector(
  [getBaseShipList, opponentShips],
  (baseShipList, opponentShipList) =>
    opponentShipList.map((ship) =>
      new ShipRecord(baseShipList.get(ship.get('shipId')).mergeDeep(ship)))
);

export const getOpponentFleet = createSelector(
  [opponentFleet, getOpponentShipList],
  (fleet, ships) => fleet.merge({ ships })
);

/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/types/player-profile
 * @flow
 */

export type PlayerProfile = {
  id: number,
  nickname: string,
  level: number,
  rank: number,
  limits: {
    maxShips: number,
    maxSlotItems: number,
    maxFurniture: number
  },
  coins: number,
  medals: number,
  comment: string,
  furniture: Array<number>,
  fleetCount: number,
  lsc: boolean,
  missions: {
    total: number,
    wins: number,
    losses: number
  },
  practice: {
    total: number,
    wins: number,
    losses: number
  },
  sorties: {
    total: number,
    wins: number,
    losses: number
  },
  docks: {
    constructionDockCount: number,
    repairDockCount: number
  },
  startTime: number,
  tutorial: {
    inProgress: boolean,
    progress: number
  }
};

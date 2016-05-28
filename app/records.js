/**
 * @overview
 *
 * @since 0.1.0
 */
import { Map, Record } from 'immutable';

export const Player = {
  Fleet: Record({
    flagship: undefined,
    id: undefined,
    memberId: undefined,
    mission: [],
    name: '',
    ships: []
  }),
  Materials: Record({
    fuel: 0,
    ammo: 0,
    steel: 0,
    bauxite: 0,
    instantConstruction: undefined,
    instantRepair: undefined,
    developmentMaterials: undefined,
    improvementMaterials: undefined
  }),
  Profile: Record({
    nickname: '',
    level: undefined,
    limits: Map({
      maxShips: 0,
      maxSlotItems: 0,
      maxFurniture: 0
    })
  })
};

export const Ship = Record({
  id: undefined,
  sortId: undefined,
  shipId: undefined,
  level: undefined,
  experience: undefined,
  morale: undefined,
  stars: 0,
  fuel: 0,
  ammo: 0,
  hp: undefined,
  stats: undefined,
  repair: undefined,
  flags: undefined,
  slots: undefined
});

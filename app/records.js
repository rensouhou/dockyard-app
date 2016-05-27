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
    limits: new Map({
      maxShips: 0,
      maxSlotItems: 0,
      maxFurniture: 0
    })
  })
};


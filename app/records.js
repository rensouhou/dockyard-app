/**
 * @overview
 *
 * @since 0.1.0
 */
import { Map, Record } from 'immutable';

export const Fleet = Record({
  flagship: undefined,
  id: undefined,
  memberId: undefined,
  mission: [],
  name: '',
  ships: []
});

export const Materials = Record({
  fuel: 0,
  ammo: 0,
  steel: 0,
  bauxite: 0,
  instantConstruction: undefined,
  instantRepair: undefined,
  developmentMaterials: undefined,
  improvementMaterials: undefined
});

export const PlayerProfile = Record({
  nickname: '',
  level: undefined,
  limits: Map({
    maxShips: 0,
    maxSlotItems: 0,
    maxFurniture: 0
  })
});

export const Player = {
  Fleet,
  Materials,
  PlayerProfile
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
  name: {
    kanji: '',
    reading: ''
  },
  stats: {
    firepower: undefined,
    torpedo: undefined,
    endurance: undefined,
    antiAir: undefined,
    luck: undefined,
    range: undefined,
    speed: undefined
  },
  repair: undefined,
  flags: undefined,
  rarity: undefined,
  gains: {
    scrap: undefined,
    modernize: undefined
  },
  remodel: {
    level: undefined,
    remodelsToId: undefined
  },
  type: undefined,
  slot: {
    count: undefined,
    capacity: [],
    items: []
  }
});

import { expect } from 'chai';
import { isAbyssalShip } from '../../../app/core/game/data-helpers';

const abyssalOne = {
  flavorText: '',
  name: { kanji: '戦艦レ級', reading: '' },
  ammo: null,
  gains: { scrap: {} },
  remodel: { level: null, remodelsToId: null },
  fuel: null,
  shipId: 561,
  sortId: null,
  type: 10,
  slot: { count: 4 },
  stats: { firepower: {}, torpedo: {}, endurance: {}, antiAir: {}, luck: {}, speed: 10 }
};

const abyssalTwo = {
  flavorText: '',
  name: { kanji: '戦艦レ級', reading: 'elite' },
  ammo: null,
  gains: { scrap: {} },
  remodel: { level: null, remodelsToId: null },
  fuel: null,
  shipId: 562,
  sortId: null,
  type: 10,
  slot: { count: 4 },
  stats: { firepower: {}, torpedo: {}, endurance: {}, antiAir: {}, luck: {}, speed: 10 }
};

describe('data-helpers', () => {
  describe('isAbyssalShip', () => {
    // @todo pending
    it('identify an abyssal ship', () => {
      expect(isAbyssalShip(abyssalOne)).to.equals(true);
    });
  });

  describe('getShipSpeed', () => {
    // @todo pending
    it('get the speed for an FBB');
    it('get the speed to a normal DD');
  });

  describe('getFleetSpeed', () => {
    it('get the speed for a slow fleet');
    it('get the speed for a medium fleet');
    it('get the speed for a fast fleet');
  });

  describe('getShipLOS', () => {
    it('calculate the ship\'s LOS');
  });

  describe('getFleetLOS', () => {
    it('calculate the fleet\'s LOS');
  });

  describe('getShipRange', () => {
    it('should get the correct range enum');
  });
});

import { expect } from 'chai';
import { isAbyssalShip } from '../../app/core/game/data-helpers';

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

describe('core/data-helpers', () => {
  describe('isAbyssalShip', () => {
    // @todo pending
    it('should correctly identify an abyssal ship', () => {
      expect(isAbyssalShip(abyssalOne)).to.equals(true);
    });
  });
  describe('getShipSpeed', () => {
    // @todo pending
    it('should get the correct speed for an FBB');
    it('should get the correct speed to a normal DD');
  });
  describe('getFleetSpeed', () => {
    it('should get the correct speed for a slow fleet');
    it('should get the correct speed for a medium fleet');
    it('should get the correct speed for a fast fleet');
  });
  describe('getShipLOS', () => {
    it('should calculate the ship\'s LOS');
  });
  describe('getFleetLOS', () => {
    it('should calculate the fleet\'s LOS');
  });
  describe('getShipRange', () => {
    it('should get the correct range enum');
  });
});

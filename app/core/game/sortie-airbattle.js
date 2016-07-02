/* eslint-disable */
/**
 * @overview
 */
import { createSelector } from 'reselect';
import { Map } from 'immutable';

const { floor, sqrt } = Math;

const cat1 = [0, 0, 2, 5, 9, 14, 14, 22, 22];
const cat2 = [0, 0, 1, 1, 1, 3, 3, 6, 6];
const cat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * @type {function}
 * @param {SlotItemRecord|Map} slotItem
 * @returns {number}
 */
const getProficiency = (slotItem) => {
  const airplaneLevel = slotItem.get('airplaneLevel');

  if (!airplaneLevel || airplaneLevel === 0) {
    return 0;
  }

  const itemInfoType = slotItem.getIn(['type', 'itemInfoType']);

  if (itemInfoType === 6 || itemInfoType === 45) {
    return cat1[airplaneLevel];
  }
  else if (itemInfoType === 1) {
    return cat2[airplaneLevel];
  }
  else if (itemInfoType === 7 || itemInfoType === 8) {
    return cat3[airplaneLevel];
  }
};

/**
 * @param {number} count
 * @param {number[]} slots
 * @param {SlotItemRecord[]} slotItems
 */
const getFighterPower = (count, slots, slotItems) =>
  slotItems.reduce((sum, it, k) => {
    const aaStat = it.getIn(['stats', 'antiAir']);
    const slotCount = slots.get(k);
    const proficiency = getProficiency(it);

    return sum + floor(sqrt(slotCount) * aaStat + proficiency);
  }, 0);

/**
 * @type {function}
 * @param {ShipRecord|Map} s
 * @returns {number[]}
 */
const getShipSlotData = (s) => [
  s.getIn(['slot', 'count']),
  s.getIn(['slot', 'capacity']),
  s.getIn(['slot', 'items'])
];

/**
 * @type {function}
 * @param {FleetRecord|Map} fleet
 * @returns {number}
 */
export const getFleetFighterPower = (fleet) =>
  fleet.get('ships')
       .map((s) => getFighterPower(...getShipSlotData(s)))
       .reduce((sum, v) => sum += v, 0);

export const getAirSuperiority = (playerFleet, opponentFleet) => {
  const playerFleetFP = getFleetFighterPower(playerFleet);
  const opponentFleetFP = getFleetFighterPower(opponentFleet);

  if (playerFleetFP >= 3 * opponentFleetFP) {
    return 'jorma';
  }
};

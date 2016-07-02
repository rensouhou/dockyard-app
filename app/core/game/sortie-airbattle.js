/* eslint-disable */
/**
 * @overview
 */

const cat1 = [0, 0, 2, 5, 9, 14, 14, 22, 22];
const cat2 = [0, 0, 1, 1, 1, 3, 3, 6, 6];
const cat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * @type {function}
 * @param {SlotItemRecord} slotItem
 * @returns {number}
 */
const getProficiency = (slotItem) => {
  if (slotItem.airplaneLevel === 0) {
    return 0;
  }

  if (slotItem.type.itemInfoType === 6 || slotItem.type.itemInfoType === 45) {
    return cat1[slotItem.airplaneLevel];
  }
  else if (slotItem.type.itemInfoType === 1) {
    return cat2[slotItem.airplaneLevel];
  }
  else if (slotItem.type.itemInfoType === 7 || slotItem.type.itemInfoType === 8) {
    return cat3[slotItem.airplaneLevel];
  }
};

/**
 * @param {number} count
 * @param {number[]} slots
 * @param {SlotItemRecord[]} slotItems
 */
const getFighterPower = (count, slots, slotItems) =>
  slotItems.reduce((sum, it, idx) => sum += Math.floor(
    Math.sqrt(slots[idx]) * it.stats.antiAir + getProficiency(it)
  ), 0);

/**
 * @type {function}
 * @param {ShipRecord} s
 * @returns {number[]}
 */
const getShipSlotData = (s) => [s.slot.count, s.slot.capacity, s.slot.items];

/**
 * @type {function}
 * @param {FleetRecord} fleet
 * @returns {number}
 */
export const getFleetFighterPower = (fleet) =>
  fleet.map((f) =>
    f.get('ships')
     .map((s) => getFighterPower(...getShipSlotData(s)))
     .reduce((sum, v) => sum += v, 0)
  );

export const getAirSuperiority = (playerFleet, opponentFleet) => {
  const playerFleetFP = getFleetFighterPower(playerFleet);
  const opponentFleetFP = getFleetFighterPower(opponentFleet);

  if (playerFleetFP >= 3 * opponentFleetFP) {
    return 'jorma';
  }
};

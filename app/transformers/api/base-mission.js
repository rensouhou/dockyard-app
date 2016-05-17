/**
 * @overview
 *
 * @since 0.1.0
 */
const rewardItem = ([id, amount]) => ({ id, amount });

/**
 * @param {KCS.Models.BaseMission} o
 */
export const baseMission = o => ({
  id: o.api_id,
  mapAreaId: o.api_maparea_id,
  name: o.api_name,
  details: o.api_details,
  duration: o.api_time,
  difficulty: o.api_difficulty,
  consumption: {
    fuel: o.api_use_fuel,
    ammo: o.api_use_bull
  },
  rewards: [o.api_win_item1, o.api_win_item2].filter(it => !!it).map(rewardItem),
  interruptable: o.api_return_flag,
  $_finalized: false,
  $_unclear: ['interruption']
});

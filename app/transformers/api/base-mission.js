/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/base-mission
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
  rewards: [o.api_win_item1, o.api_win_item2].map(rewardItem),
  interruption: o.api_return_flag,
  $_finalized: false,
  $_unclear: ['interruption']
});

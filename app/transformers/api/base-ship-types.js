/// <reference path="../../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/base-ship-type
 * @flow
 */

type LocalizedString = {
  ja: string,
  en?: string
};

type ShipTypeName = {
  [id: number]: LocalizedString
}

const typeName:ShipTypeName = {
  1: { ja: '海防艦	', en: 'Escort Ship' },
  2: { ja: '駆逐艦	', en: 'Destroyer' },
  3: { ja: '軽巡洋艦', en: 'Light Cruiser' },
  4: { ja: '重雷装巡洋艦', en: 'Torpedo Cruiser' },
  5: { ja: '重巡洋艦', en: 'Heavy Cruiser' },
  6: { ja: '航空巡洋艦', en: 'Aircraft Cruiser' },
  7: { ja: '軽空母', en: 'Light Aircraft Carrier' },
  8: { ja: '巡洋戦艦', en: 'Battleship (?)' },
  9: { ja: '戦艦', en: 'Battleship' },
  10: { ja: '航空戦艦', en: 'Aviation Battleship' },
  11: { ja: '正規空母', en: 'Aircraft Carrier' },
  12: { ja: '超弩級戦艦', en: 'Super Dreadnoughts' },
  13: { ja: '潜水艦', en: 'Submarine' },
  14: { ja: '潜水空母', en: 'Aircraft Carrying Submarine' },
  15: { ja: '補給艦 (敵のほう)' },
  16: { ja: '水上機母艦', en: 'Seaplane Carrier' },
  17: { ja: '揚陸艦', en: 'Amphibious Assault Ship' },
  18: { ja: '装甲空母', en: 'Aircraft Carrier' },
  19: { ja: '工作艦', en: 'Repair Ship' },
  20: { ja: '潜水母艦', en: 'Submarine Tender' },
  21: { ja: '練習巡洋艦', en: 'Training Cruiser' },
  22: { ja: '補給艦 (味方のほう)', en: 'Fleet Oiler' }
};

const shipTypeName = (id, name = typeName) => name[id] || null;

export const baseShipType = (o) => ({
  id: o.api_id,
  sortId: o.api_sortno,
  name: shipTypeName(o.api_name),
  slotCount: o.api_scnt,
  silhouette: o.api_kcnt,
  equipType: o.api_equip_type,
  $_finalized: false
});

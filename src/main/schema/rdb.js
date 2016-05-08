/**
 * @overview
 *
 * @since 0.4.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/main/schema/rdb
 */
import invariant from 'invariant';

export default function (thinky, type) {
  invariant(thinky && type, 'Thinky instance required');
  const r = thinky.r;

  const MaterialState = thinky.createModel('MaterialState', {
    timestamp: type.date().default(r.now()),
    fuel: type.number().integer(),
    ammo: type.number().integer(),
    steel: type.number().integer(),
    bauxite: type.number().integer(),
    instantConstruction: type.number().integer().optional(),
    instantRepair: type.number().integer().optional(),
    developmentMaterials: type.number().integer().optional(),
    improvementMaterials: type.number().integer().optional()
  });
  MaterialState.ensureIndex('timestamp');

  const CraftingLog = thinky.createModel('CraftingLog', {
    timestamp: type.date().default(r.now()),
    fuel: type.number().integer(),
    ammo: type.number().integer(),
    steel: type.number().integer(),
    bauxite: type.number().integer(),
    flags: {
      successful: type.boolean().optional(),
      usedDevelopmentMaterials: type.boolean().optional(),
      lsc: type.boolean().optional(),
      instant: type.boolean().optional()
    },
    id: type.number().optional(),
    entityId: type.number().optional()
  });
  CraftingLog.ensureIndex('timestamp');

  const Opponent = thinky.createModel('Opponent', {
    timestamp: type.date().default(r.now()),
    id: type.number().required(),
    level: type.number().required(),
    nickname: type.string(),
    comment: type.string(),
    rank: type.number(),
    counts: {
      ships: type.number(),
      slotItems: type.number()
    },
    fleet: {
      name: type.string(),
      ships: [type.number()]
    }
  });
  Opponent.ensureIndex('timestamp');

  const GameEvent = thinky.createModel('GameEvent', {
    timestamp: type.date().default(r.now()),
    type: type.string()
  });
  GameEvent.ensureIndex('timestamp');

  return { MaterialState, CraftingLog, Opponent, GameEvent };
}

/* eslint no-case-declarations: 0, no-new: 0, no-console: 0 */
/**
 * @overview
 *  Back-end implementation for RDB logging.
 *  Electron + Webpack has issues and I want to log my event data. 🙃
 *
 *  Rewrite/overhaul this at some later point to be a little bit more
 *  configurable. Maybe.
 *
 * @since 0.1.0
 */
import { ipcMain } from 'electron';
import chalk from 'chalk';
import Thinky from 'thinky';
import createSchemas from './schema/rdb';
import AppEvent from '../shared/constants';
import { ApiEvents as ApiEvent } from '../../app/constants';

const g = chalk.green;
const gi = g.inverse;
const c = chalk.cyan;
const ci = c.inverse;

export function createGameDataLogger() {
  const dbName = 'dockyard_rdb';
  console.log(c(`Creating game data logger; using database ${ci(dbName)}`));
  const thinky = Thinky({ db: 'dockyard_rdb' });
  const r = thinky.r;
  const type = thinky.type;
  const schema = createSchemas(thinky, type);
  console.log(`${c('Schemas:')} [${c(Object.keys(schema).join(', '))}]`);

  ipcMain.on(AppEvent.REHYDRATE_STORE_REQUEST, async event => {
    event.sender.send(AppEvent.REHYDRATE_STORE,
      await r.table('MaterialState')
             .orderBy(r.desc('timestamp'))
             .nth(0)
             .run());
  });

  // @todo(@stuf): this needs some rethinking (ahue)
  ipcMain.on(AppEvent.DB_LOG_EVENT, (event, arg) => {
    try {
      const { payload } = arg.action;
      const eventType = arg.action.type;
      if (!ApiEvent[eventType]) {
        console.log(`${g('Could not find handler for event')} ${gi(eventType)}`);
        return;
      }
      console.log(`${ci(AppEvent.DB_LOG_EVENT)}: ${c('event')} ${ci(arg.action.type)}`);

      new schema.GameEvent({ type: payload.type }).saveAll();

      // Log material state
      const materialLogEvents = [
        ApiEvent.GET_BASE_DATA,
        ApiEvent.RESUPPLY_SHIP,
        ApiEvent.GET_MATERIAL,
        ApiEvent.CRAFT_ITEM,
        ApiEvent.DESTROY_SHIP
      ];

      if (materialLogEvents.indexOf(eventType) !== -1) {
        console.log(c(`--> ${JSON.stringify(payload.materials)}`));
        new schema.MaterialState(payload.materials).saveAll();
      }

      switch (eventType) {
        case ApiEvent.GET_OPPONENT_INFO:
          console.log(c(JSON.stringify(payload)));
          new schema.Opponent(payload.fleet).saveAll();
          break;
        case ApiEvent.FINISHED_SORTIE:
          console.log(c(JSON.stringify(payload)));
          // new schema.SortieResult().saveAll();
          break;
        default:
          break;
      }
    }
    catch (e) {
      console.error('errored =>', e.message, e.stack);
    }
  });
}

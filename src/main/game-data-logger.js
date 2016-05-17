/* eslint no-case-declarations: 0, no-new: 0, no-console: 0 */
/**
 * @overview
 *  Back-end implementation for RDB logging.
 *  Electron + Webpack has issues and I want to log my event data. 🙃
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { ipcMain } from 'electron';
import chalk from 'chalk';
import Thinky from 'thinky';
import createSchemas from './schema/rdb';
import AppEvent from '../shared/constants';
import { ApiEvents as ApiEvent } from '../../app/actions/game';

const g = chalk.green;
const gi = g.inverse;
const c = chalk.cyan;
const ci = c.inverse;

export function createGameDataLogger() {
  const dbName = 'dockyard_rdb';
  console.log(c(`Creating game data logger; using database ${ci(dbName)}`));
  const thinky = Thinky({ db: 'dockyard_rdb' });
  const type = thinky.type;
  const schema = createSchemas(thinky, type);
  console.log(`${c('Schemas:')} [${c(Object.keys(schema).join(', '))}]`);

  ipcMain.on(AppEvent.REHYDRATE_STORE_REQUEST, event => {
    // @todo(@stuf): fetch data for rehydrating the store
    event.sender.send(AppEvent.REHYDRATE_STORE, {});
  });

  // @todo(@stuf): this needs some rethinking (ahue)
  ipcMain.on(AppEvent.DB_LOG_EVENT, (event, arg) => {
    const { payload } = arg.action;
    const eventType = arg.action.type;
    if (!ApiEvent[eventType]) {
      console.log(`${g('Could not find handler for event')} ${gi(eventType)}`);
      return;
    }
    console.log(`${ci(AppEvent.DB_LOG_EVENT)}: ${c(JSON.stringify(arg))}`);

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
      console.log('Logging material state');
      new schema.MaterialState(payload.materials).saveAll();
    }
  });
}

/**
 * @overview
 *
 * @since 0.0.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/config
 */
import path from 'path';

export default {
  gamePageURL: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/',
  rootEventName: 'kancolledata',
  rootEventNode: 'body',
  apiDataPrefix: 'svdata=',
  pathPrefix: /.*\/kcsapi/,
  gameSwfPrefix: /kcs\/mainD2/,
  rootDir: path.resolve('..'),
  configDir: path.resolve('../etc'),
  gameConfigFile: 'dockyard.json'
};

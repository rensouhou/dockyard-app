/**
 * @overview
 *
 * @since 0.1.0
 */
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import application from './application';
import crafting from './crafting';
import game from './game';
import gameState from './game-state';
import player from './player';
import quest from './quest';
import practice from './practice';
import result from './result';

const rootReducer = combineReducers({
  application,
  game,
  gameState,
  player,
  quest,
  practice,
  result,
  crafting,
  routing
});

export default rootReducer;

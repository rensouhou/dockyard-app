/**
 * @overview
 *
 * @since 0.2.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/reducers
 */
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import core from './core';
import crafting from './crafting';
import game from './game';
import gameState from './game-state';
import player from './player';
import quest from './quest';
import practice from './practice';
import result from './result';

const rootReducer = combineReducers({
  core,
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

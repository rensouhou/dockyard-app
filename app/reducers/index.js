/**
 * @overview
 *
 * @since 0.1.0
 */
import { combineReducers } from 'redux-immutable';
import routing from './routing';
import application from './application';
import game from './game';
import player from './player';

const rootReducer = combineReducers({ application, game, player, routing });

export default rootReducer;

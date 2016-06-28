/**
 * @overview
 *
 * @since 0.1.0
 * @version 0.3.0
 * @module app/reducers
 */
import { combineReducers } from 'redux-immutable';
import routing from './routing';
import application from './application';
import game from './game';
import player from './player';
import opponent from './opponent';
import quest from './quest';

const rootReducer = combineReducers({ application, game, player, quest, opponent, routing });

export default rootReducer;

/**
 * @overview
 *
 * @since 0.1.0
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/Game';
import { createTransformerActions, prepareTransformerActions, createGameActions } from '../actions/game';
import * as coreActions from '../actions/application';
import { getPlayer } from '../selectors/player';
import { Map } from 'immutable';

const transformerFns = prepareTransformerActions.cacheResult();

/**
 * @typedef {Object} UIStateProps
 * @property {Immutable.Map} ui
 */

/**
 * @typedef {Immutable.Map} UIState
 * @property {Immutable.Map} UIStatePlayer
 */

/**
 * @param state
 * @returns {UIState}
 */
const mapStateToProps = (state) => ({
  ui: Map({
    player: getPlayer(state)
  })
});

// @todo rethink this into something cleaner
const mapDispatchToProps = (dispatch) => ({
  transformerActions: bindActionCreators(createTransformerActions(), dispatch),
  transFns: bindActionCreators(transformerFns.toJS(), dispatch),
  game: bindActionCreators(createGameActions(), dispatch),
  actions: bindActionCreators({ ...coreActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

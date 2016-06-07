/**
 * @overview
 *
 * @since 0.1.0
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionHandlers } from '../actions/api-actions';
import { actions as applicationActions } from '../actions/application';
import { getPlayer } from '../selectors/player';
import { Map } from 'immutable';
import Game from '../components/Game';

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
  ui: {
    player: getPlayer(state)
  }
});

/**
 * @param {Dispatch} dispatch
 */
const mapDispatchToProps = (dispatch) => ({
  actions: {
    application: bindActionCreators(applicationActions, dispatch),
    transformers: bindActionCreators(actionHandlers.toJS(), dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

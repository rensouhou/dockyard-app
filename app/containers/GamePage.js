/**
 * @overview
 *  The root container that will act as a single source of truth in
 *  regards to data.
 *
 * @since 0.1.0
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionHandlers } from '../actions/api-actions';
import { actions as applicationActions } from '../actions/application';
import { getPlayer } from '../selectors/player';
import { getQuestState } from '../selectors/quest';
import Game from '../components/Game';

/**
 * @param {IMap<string, *>} state
 * @returns {ApplicationUIState}
 * @since 0.1.0
 * @version 0.3.0
 */
const mapStateToProps = (state) => ({
  ui: {
    player: getPlayer(state),
    quest: getQuestState(state)
  }
});

/**
 * @param {Dispatch} dispatch
 * @returns {ApplicationUIState}
 * @since 0.1.0
 * @version 0.2.0
 */
const mapDispatchToProps = (dispatch) => ({
  actions: {
    application: bindActionCreators(applicationActions, dispatch),
    transformers: bindActionCreators(actionHandlers.toJS(), dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

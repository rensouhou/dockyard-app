/**
 * @overview
 *
 * @since 0.1.0
 */
import { connect } from 'react-redux';
import GameUI from '../../components/game/game-ui';

const mapStateToProps = state => ({
  appState: { ...state }
});

export default connect(mapStateToProps)(GameUI);

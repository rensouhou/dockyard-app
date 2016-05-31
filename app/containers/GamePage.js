import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/Game';
import { createTransformerActions, createGameActions } from '../actions/game';
import * as coreActions from '../actions/application';
import { getPlayer } from '../selectors/player';

const mapStateToProps = state => ({
  ui: {
    player: getPlayer(state)
  }
});

const mapDispatchToProps = dispatch => ({
  transformerActions: bindActionCreators(createTransformerActions(), dispatch),
  game: bindActionCreators(createGameActions(), dispatch),
  actions: bindActionCreators({ ...coreActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

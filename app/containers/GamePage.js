import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/Game';
import { createTransformerActions, createGameActions } from '../actions/game';
import * as coreActions from '../actions/application';
import { gameEntities } from '../selectors/game-entities';
import { normalizeShips } from '../selectors/player-entities';

const mapStateToProps = state => ({
  appState: { ...state },
  entities: {
    player: {
      ships: normalizeShips(state)
    }
  },
  gameEntities: gameEntities(state)
});

const mapDispatchToProps = dispatch => ({
  transformerActions: bindActionCreators(createTransformerActions(), dispatch),
  game: bindActionCreators(createGameActions(), dispatch),
  actions: bindActionCreators({ ...coreActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

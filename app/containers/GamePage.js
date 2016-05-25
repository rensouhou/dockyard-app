import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/Game';
import { createTransformerActions, createGameActions } from '../actions/game';
import * as coreActions from '../actions/application';
import { gameEntities } from '../selectors/game-entities';
import { normalizeShips, normalizeSlotItems } from '../selectors/player-entities';
import { playerFleets } from '../selectors/player';

const mapStateToProps = state => ({
  appState: { ...state },
  entities: {
    player: {
      ships: normalizeShips(state),
      slotItems: normalizeSlotItems(state)
    }
  },
  ui: {
    player: {
      fleets: playerFleets(state)
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

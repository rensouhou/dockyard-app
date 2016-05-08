import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/Game';
import { createTransformerActions, createGameActions } from '../actions/game';
import * as coreActions from '../actions/core';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

const mapDispatchToProps = dispatch => ({
  transformerActions: bindActionCreators(createTransformerActions(), dispatch),
  game: bindActionCreators(createGameActions(), dispatch),
  actions: bindActionCreators({ ...coreActions }, dispatch)
});

console.log('mapDispatchToProps =>', coreActions);

export default connect(mapStateToProps, mapDispatchToProps)(Game);

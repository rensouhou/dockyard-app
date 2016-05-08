import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/Game';

const mapDispatchToProps = dispatch => ({
  derp: true
});

export default connect(null, mapDispatchToProps)(Game);

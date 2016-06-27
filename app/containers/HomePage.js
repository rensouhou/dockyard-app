import { connect } from 'react-redux';
import Home from '../components/Home';

const mapStateToProps = (state) => ({
  version: state.getIn(['application', 'packageJson', 'version'])
});

export default connect(mapStateToProps)(Home);

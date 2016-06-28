/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as coreActions from '../actions/application';
import Test from '../components/Test';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...coreActions }, dispatch)
});

export default connect(null, mapDispatchToProps)(Test);

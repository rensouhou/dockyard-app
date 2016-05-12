import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Configure from '../components/Configure';
import { saveConfiguration, readConfiguration } from '../actions/core';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ saveConfiguration, readConfiguration }, dispatch)
});

export default connect(null, mapDispatchToProps)(Configure);

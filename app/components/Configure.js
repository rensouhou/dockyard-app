/* eslint no-console: 0 */
/**
 */
import React, { Component, PropTypes } from 'react';

/**
 * @class ConfigureComponent
 * @extends Component
 */
export default class ConfigureComponent extends Component {
  static propTypes = {
    actions: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      configSections: [
        this.readConfiguration('core')
      ]
    };
  }

  readConfiguration = (file) =>
    this.props.actions.readConfiguration(file);

  saveConfiguration = (file, content) =>
    this.props.actions.saveConfiguration({ file, content });

  render() {
    console.log('component:Configure', this.props);
    return (
      <div>
        Configure
        <div></div>
      </div>
    );
  }
}

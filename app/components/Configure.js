/* eslint no-console: 0 */
/**
 * @flow
 */
import React, { Component, PropTypes } from 'react';

export default class Configure extends Component {
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

  readConfiguration = (file:string) =>
    this.props.actions.readConfiguration(file);

  saveConfiguration = (file:string, content:any) =>
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

/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { Component, PropTypes } from 'react';
import StaticPanel from './static-panel';
import { ipcRenderer } from 'electron';

export default class FunctionalityTestPanel extends Component {
  static propTypes = {
    actions: PropTypes.object
  };

  timerTestClickHandler = event => {
    this.props.actions.scheduleEvent({ targetTime: +(new Date()) + 5000 });
  };

  render() {
    return (
      <StaticPanel title="FunctionalityTestPanel">
      </StaticPanel>
    );
  }
}

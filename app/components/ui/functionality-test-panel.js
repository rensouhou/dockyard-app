/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { Component, PropTypes } from 'react';
import { ipcRenderer } from 'electron';
import StaticPanel from './static-panel';
import Button from './button';
import css from './functionality-test-panel.scss';

export default class FunctionalityTestPanel extends Component {
  static propTypes = {
    actions: PropTypes.object
  };

  timerTestClickHandler = event => {
    console.log('timerTestClickHandler clicked', event);
    this.props.actions.scheduleEvent({ targetTime: +(new Date()) + 5000 });
  };

  render() {
    return (
      <StaticPanel title="FunctionalityTestPanel" className={css.functionalityTestPanel}>
        <Button onClickHandler={this.timerTestClickHandler}>Timer</Button>
      </StaticPanel>
    );
  }
}

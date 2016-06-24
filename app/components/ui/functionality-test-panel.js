/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { Component, PropTypes } from 'react';
import StaticPanel from './static-panel';
import Button from './button';
import css from './functionality-test-panel.scss';

/**
 * @deprecated
 * @class FunctionalityTestPanel
 * @extends Component
 */
export default class FunctionalityTestPanel extends Component {
  static propTypes = {
    actions: PropTypes.object,
    appState: PropTypes.object
  };

  timerTestClickHandler = () => {
    this.props.actions.scheduleEvent({ targetTime: +(new Date()) + 5000 });
  };

  screenshotClickHandler = () => {
    this.props.actions.takeScreenshot(this.props.appState.core.webview);
  };

  notifyClickHandler = () => {
    this.props.actions.notify('Notification title here', { body: 'Body text here' });
  };

  render() {
    return (
      <StaticPanel title="FunctionalityTestPanel" className={css.functionalityTestPanel}>
        <Button onClickHandler={this.timerTestClickHandler}>Timer</Button>
        <Button onClickHandler={this.screenshotClickHandler}>Screenshot</Button>
        <Button onClickHandler={this.notifyClickHandler}>Notify</Button>
      </StaticPanel>
    );
  }
}

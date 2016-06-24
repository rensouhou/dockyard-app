/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { Component, PropTypes } from 'react';
import { FunctionalityTestPanel } from './ui';

/**
 * @class TestComponent
 * @extends Component
 */
export default class TestComponent extends Component {
  static propTypes = {
    actions: PropTypes.object
  };

  render() {
    return (
      <div>
        <FunctionalityTestPanel actions={this.props.actions} />
      </div>
    );
  }
}

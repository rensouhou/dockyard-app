/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';

export default class Ship extends Component {
  static propTypes = {
    id: PropTypes.number,
    shipId: PropTypes.number,
    name: PropTypes.any,
    level: PropTypes.number,
    hp: PropTypes.arrayOf(PropTypes.number)
  };

  render() {
    if (R.isEmpty(this.props.id)) {
      return <div>Not a valid ship</div>;
    }
    return (
      <div>
        {this.props.name}
      </div>
    );
  }
}

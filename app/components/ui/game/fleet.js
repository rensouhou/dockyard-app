/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import style from './fleet.scss';

export default class Fleet extends Component {
  static propTypes = {
    fleet: PropTypes.object
  };

  render() {
    return (
      <div className={style.fleet}></div>
    );
  }
}

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
    id: PropTypes.number.isRequired,
    memberId: PropTypes.number,
    name: PropTypes.string,
    ships: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { name, ships, id } = this.props;
    return (
      <div className={style.fleet}>
        <div>{name}</div>
        <div>
          <ul>
            {ships.map(it => <li>{JSON.stringify(it)}</li>)}
          </ul>
        </div>
        <div>
          <pre>{JSON.stringify(this.props)}</pre>
        </div>
      </div>
    );
  }
}

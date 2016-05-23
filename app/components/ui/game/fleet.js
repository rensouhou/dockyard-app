/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { Component, PropTypes } from 'react';
import Ship from './ship';
import style from './fleet.scss';

export default class Fleet extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    memberId: PropTypes.number,
    name: PropTypes.string,
    ships: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    ships: []
  };

  render() {
    const { name, ships, id } = this.props;
    return (
      <div className={style.fleet}>
        <div>{name}</div>
        <div className={style.ships}>
          {ships.map(s => <Ship key={s.id} {...s} />)}
        </div>
        <div>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

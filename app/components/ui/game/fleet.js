/**
 * @overview
 *
 * @since 0.1.0
 *
 * @todo PropTypes for monads
 */
import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import Ship from './ship';
import style from './fleet.scss';

const { isEmpty } = R;

export default class Fleet extends Component {
  static propTypes = {
    fleet: PropTypes.object,
    fleetM: PropTypes.any,
    id: PropTypes.number,
    memberId: PropTypes.number,
    name: PropTypes.string,
    ships: PropTypes.array,
    shipsM: PropTypes.any
  };

  static defaultProps = {};

  render() {
    const { fleet, ships } = this.props;
    if (isEmpty(fleet) || isEmpty(ships)) {
      return (
        <div>No fleet data.</div>
      );
    }

    const { name, id } = fleet;
    return (
      <div className={style.fleet}>
        <div>{name}</div>
        <div className={style.ships}>
          {ships.map(s => <Ship
            name={s.name}
            level={s.level}
            morale={s.morale}
            hp={s.hp}
          />)}
        </div>
      </div>
    );
  }
}

/**
 * @overview
 *
 * @since 0.1.0
 *
 * @todo PropTypes for monads
 */
import React, { Component, PropTypes } from 'react';
import Ship from './ship';
import style from './fleet.scss';

export default class Fleet extends Component {
  static propTypes = {
    // fleet: PropTypes.object,
    fleetM: PropTypes.any,
    id: PropTypes.number,
    memberId: PropTypes.number,
    name: PropTypes.string,
    // ships: PropTypes.array,
    shipsM: PropTypes.any
  };

  static defaultProps = {};

  render() {
    const { fleetM, shipsM } = this.props;
    if (fleetM.isNothing()) {
      return (
        <div>No fleet data.</div>
      );
    }

    const { name, id } = fleetM.orJust({});
    const ships = shipsM.orJust([]);
    return (
      <div className={style.fleet}>
        <div>{name}</div>
        <div className={style.ships}>
          {ships.map(s => <Ship
            level={s.level}
            morale={s.morale}
            hp={s.hp}
          />)}
        </div>
        <div>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

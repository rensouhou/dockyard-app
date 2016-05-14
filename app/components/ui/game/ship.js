/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import StaticPanel from '../static-panel';
import style from './ship.scss';

export default class Ship extends Component {
  static propTypes = {
    id: PropTypes.number,
    shipId: PropTypes.number,
    name: PropTypes.any,
    level: PropTypes.number,
    hp: PropTypes.arrayOf(PropTypes.number),
    morale: PropTypes.number
  };

  render() {
    const { id, shipId, hp, level, name, morale } = this.props;

    if (R.isEmpty(this.props.id)) {
      return <div>Not a valid ship</div>;
    }
    return (
      <StaticPanel title={`${name.reading}`} className={style.ship}>
        <header>
          <div className={style.name}>{name.kanji}</div>
          <div className={style.level}>{level}</div>
          <div className={style.morale}><i className="fa fa-heart" /> {morale}</div>
        </header>
        <StaticPanel title="HP">
          <div style={{ paddingBottom: '0.75rem' }}>{hp[0]} / {hp[1]}</div>
        </StaticPanel>
      </StaticPanel>
    );
  }
}

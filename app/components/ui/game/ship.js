/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { PropTypes } from 'react';
import StaticPanel from '../static-panel';
import Progress from '../progress';
import css from './ship.scss';

const ShipComponent = (props) => {
  const { ship } = props;
  const { slot } = ship;
  return (
    <StaticPanel title={ship.name.reading} className={css.ship}>
      <div className={css.shipBody}>
        <div>
          <div style={{ width: '50%' }}>{(ship.name || {}).kanji}</div>
          <div style={{ width: '25%' }}><i className="fa fa-heart" /> {ship.morale}</div>
          <div style={{ width: '25%', textAlign: 'right', fontWeight: 'bold' }}>{ship.level}</div>
        </div>
        <div>
          {slot.items.map((it) => (<div>{it.type.category}<br />{it.name}</div>))}1
        </div>
        <div>
          <Progress min={0} max={100} value={ship.experience[2]} />
        </div>
      </div>
    </StaticPanel>
  );
};

ShipComponent.propTypes = {
  ship: PropTypes.object.isRequired
};

export default ShipComponent;

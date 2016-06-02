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

const ShipSlotItems = (props) => (
  <div>
    <ul>
      {props.items.map((it, idx) => (
        <li>{idx} -> {it.name} (category: {it.type.category})</li>
      ))}
    </ul>
  </div>
);

ShipSlotItems.propTypes = {
  items: PropTypes.any,
  count: PropTypes.number
};

ShipSlotItems.defaultProps = {
  slotItems: []
};

const ShipComponent = (props) => {
  const { ship } = props;
  const { slot } = ship;
  console.log('slot =>', slot);
  return (
    <StaticPanel title={ship.name.reading} className={css.ship}>
      <div className={css.shipBody}>
        <div>
          <div style={{ width: '50%' }}>{(ship.name || {}).kanji}</div>
          <div style={{ width: '25%' }}><i className="fa fa-heart" /> {ship.morale}</div>
          <div style={{ width: '25%', textAlign: 'right', fontWeight: 'bold' }}>{ship.level}</div>
        </div>
        <ShipSlotItems items={slot.items} count={slot.count} />
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

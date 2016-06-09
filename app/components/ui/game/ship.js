/**
 * @overview
 *  Provides a <Ship /> component that consumes a standard
 *  {@link records.js~Ship} record object. Usable anywhere where
 *  a basic ship information panel is required.
 *
 * @since 0.1.0
 */
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import StaticPanel from '../static-panel';
import Progress from '../progress';
import css from './ship.scss';

// region # Ship slot item display
const ShipSlotItems = (props) => (
  <div>
    <ul>
      {props.items.map((it, idx) => (
        <li key={`${it.id}-${idx}`}>{idx} -> {it.name} (category: {it.type.category})</li>
      ))}
    </ul>
  </div>
);

ShipSlotItems.propTypes = {
  items: PropTypes.any,
  count: PropTypes.number,
  slotItems: ImmutablePropTypes.listOf(ImmutablePropTypes.record)
};
// endregion

// region # <Ship /> component
/**
 * @param {{record: Record|Map<string, *>}} props
 * @returns {JSX.Element}
 * @constructor
 */
const ShipComponent = (props) => {
  const record = props.record;
  const slotItems = record.getIn(['slot', 'items']);
  const slotCapacities = record.getIn(['slot']);
  const name = record.name.toJS();
  return (
    <StaticPanel title={name.reading} className={css.ship}>
      <div className={css.shipBody}>
        <div>
          <div style={{ width: '50%' }}>{(name || {}).kanji}</div>
          <div style={{ width: '25%' }}><i className="fa fa-heart" /> {record.morale}</div>
          <div style={{ width: '25%', textAlign: 'right', fontWeight: 'bold' }}>{record.level}</div>
        </div>
        <div>
          <Progress min={0} max={100} value={record.experience.get(2)} />
        </div>
      </div>
    </StaticPanel>
  );
};

ShipComponent.propTypes = {
  record: ImmutablePropTypes.record
};
// endregion

export default ShipComponent;

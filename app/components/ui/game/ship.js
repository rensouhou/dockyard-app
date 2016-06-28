/**
 * @overview
 *  Provides a `<Ship />` component that consumes a standard
 *  {@link ShipRecord} record object. Usable anywhere where
 *  a basic ship information panel is required.
 *
 * @since 0.1.0
 * @version 0.3.0
 */
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import StaticPanel from '../static-panel';
import ShipSlotItem from './ship-slot-item';
import Progress from '../progress';
import ItemList from '../itemlist';
import css from './ship.scss';

/**
 * @param {Object} props
 * @returns {XML|JSX.Element}
 * @constructor
 */
const ShipComponent = (props) => {
  const record = props.record;
  const name = record.name.toJS();

  return (
    <StaticPanel
      key={record.hashCode()}
      title={name.reading}
      className={css.ship}
      style={{ ...props.style || {} }}
    >
      <div className={css.shipBody}>
        <div>
          <div style={{ width: '50%' }}>{(name || {}).kanji}</div>
          <div style={{ width: '25%' }}><i className="fa fa-heart" /> {record.morale}</div>
          <div style={{ width: '25%', textAlign: 'right', fontWeight: 'bold' }}>{record.level}</div>
        </div>
        <ItemList
          itemComponent={ShipSlotItem}
          records={record.getIn(['slot', 'items'])}
        />
        <div>
          <Progress min={0} max={100} value={record.experience.get(2)} />
        </div>
      </div>
    </StaticPanel>
  );
};

ShipComponent.propTypes = {
  record: ImmutablePropTypes.record,
  style: PropTypes.object
};

export default ShipComponent;

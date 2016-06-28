/**
 * @overview
 *  Provides a `<Fleet />` component to display a fleet of `0-6` ships.
 *  Additionally, shows extra information about the fleet.
 *
 * @since 0.1.0
 * @version 0.3.0
 */
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Ship from './ship';
import ItemList from '../itemlist';
import css from './fleet.scss';

/**
 * @type {function}
 * @param {Object} props
 * @property {FleetRecord} props.record
 * @constructor
 * @since 0.1.0
 * @version 0.3.0
 */
const FleetComponent = (props) => {
  const { record } = props;
  const hasRecords = !!record;
  const itemList = hasRecords
    ? <ItemList record={record.get('ships')} itemComponent={Ship} />
    : <div>Empty fleet</div>;

  return (
    <div className={css.ships}>
      <h3 className={css.fleetName}>{record.name} {record.id}</h3>
      {itemList}
    </div>
  );
};

FleetComponent.propTypes = {
  record: ImmutablePropTypes.record
};

export default FleetComponent;

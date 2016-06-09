/**
 * @overview
 *
 * @since 0.1.0
 */
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Fleet } from '../../../records';
import Ship from './ship';

// region # <ShipList /> ship list component
/**
 * <ShipList /> component for <Fleet />
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ShipList = (props) => (
  <div>
    {props.ships.map((ship) => <Ship record={ship} />)}
  </div>
);

ShipList.propTypes = {
  ships: ImmutablePropTypes.listOf(ImmutablePropTypes.record)
};
// endregion

// region # <FleetComponent /> fleet component
/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const FleetComponent = (props) => {
  const ships = props.record.get('ships');
  return (
    <div>
      <ShipList ships={ships} />
    </div>
  );
};

FleetComponent.propTypes = {
  record: ImmutablePropTypes.record
};

FleetComponent.defaultProps = {
  record: new Fleet()
};
// endregion

export default FleetComponent;

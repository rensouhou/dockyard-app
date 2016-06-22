/**
 * @overview
 *
 * @since 0.1.0
 */
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FleetRecord } from '../../../records';
import Ship from './ship';

// region # <ShipList /> ship list component
/**
 * <ShipList /> component for <Fleet />
 * @type {React.StatelessComponent}
 * @param {Object} props
 * @returns {JSX.Element}
 * @constructor
 * @since 0.1.0
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
 * @type {React.StatelessComponent}
 * @param props
 * @returns {JSX.Element}
 * @constructor
 * @since 0.1.0
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
  record: new FleetRecord()
};
// endregion

export default FleetComponent;

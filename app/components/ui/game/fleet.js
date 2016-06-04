/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Fleet } from '../../../records';

const { isEmpty, pathOr } = R;

const getListOrDefault = (o, ...path) => pathOr([], path, o);

/**
 * <ShipList /> component for <Fleet />
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ShipList = (props) => {
  // props.ships.map(s => <Ship key={s.id} ship={s} />)
  console.log('ShipList =>', props);
  return (
    <div>
    </div>
  );
};

ShipList.propTypes = {
  ships: ImmutablePropTypes.listOf(ImmutablePropTypes.record)
};

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const FleetComponent = (props) => {
  const ships = props.record.get('ships');
  return (
    <div>
      <pre>{JSON.stringify(ships, null, 2)}</pre>
    </div>
  );
};

FleetComponent.propTypes = {
  record: ImmutablePropTypes.record
};

FleetComponent.defaultProps = {
  record: new Fleet()
};

export default FleetComponent;

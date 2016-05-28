/**
 * @overview
 *
 * @since 0.1.0
 */
import R from 'ramda';
import React, { PropTypes } from 'react';
import Ship from './ship';

const { isEmpty, pathOr } = R;
const _ = R.__;

const getListOrDefault = (o, ...path) => pathOr([], path, o);

/**
 * <ShipList /> component for <Fleet />
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ShipList = (props) => {
  if (isEmpty(props.ships)) {
    return <div>No ships.</div>;
  }
  return (
    <div>
      {props.ships.map(s => <Ship key={s.id} ship={s} />)}
    </div>
  );
};

ShipList.propTypes = {
  ships: PropTypes.arrayOf(PropTypes.object)
};

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const FleetComponent = (props) => {
  const ships = getListOrDefault(props, 'fleet', 'ships');
  if (isEmpty(ships)) {
    return (
      <div>No data.</div>
    );
  }
  return (
    <div>
      <ShipList ships={ships} />
    </div>
  );
};

FleetComponent.propTypes = {
  fleet: PropTypes.object
};

export default FleetComponent;

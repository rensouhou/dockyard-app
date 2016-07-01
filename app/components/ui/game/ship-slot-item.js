/**
 * @overview
 * @since 0.3.0
 */
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

/**
 * @param {Object} props
 * @property {SlotItemRecord} props.record
 * @returns {*}
 * @constructor
 * @since 0.3.0
 */
const ShipSlotItem = (props) => {
  const { id, name, type } = props.item;
  return (
    <li>{type.toString()}</li>
  );
};

ShipSlotItem.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, ImmutablePropTypes.record])
};

export default ShipSlotItem;

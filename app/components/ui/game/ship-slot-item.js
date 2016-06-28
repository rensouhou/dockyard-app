/**
 * @overview
 * @since 0.3.0
 */
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

/**
 * @param {Object} props
 * @property {SlotItemRecord} props.record
 * @returns {*}
 * @constructor
 * @since 0.3.0
 */
const ShipSlotItem = (props) => {
  const { id, name, type } = props.record;
  return (
    <li>{id} {name} (category: {type.get('category')})</li>
  );
};

ShipSlotItem.propTypes = {
  record: ImmutablePropTypes.record
};

export default ShipSlotItem;

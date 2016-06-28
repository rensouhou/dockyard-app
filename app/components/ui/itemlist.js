/**
 * @overview
 *  Provides a generic `ItemList` component for displaying lists of {@link Record}s.
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const components = ({ component: ItemComponent, records, style }) =>
  records.map((record, idx) => (
    <li>
      <ItemComponent {...{ record, style }} />
    </li>
  ));

const itemListStyles = {
  margin: '0'
};

const ItemList = (props) => {
  const hasItems = !!props.records && props.records.size > 0;

  const list = (
    <ul style={itemListStyles}>
      {components({ component: props.itemComponent, style: props.itemStyle, records: props.records })}
    </ul>
  );

  const empty = (
    <div>No items</div>
  );

  return hasItems ? list : empty;
};

ItemList.propTypes = {
  records: ImmutablePropTypes.listOf(ImmutablePropTypes.record),
  itemComponent: PropTypes.func.isRequired,
  style: PropTypes.object,
  itemStyle: PropTypes.object
};

export default ItemList;

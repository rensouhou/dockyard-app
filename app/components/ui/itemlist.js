/**
 * @overview
 *  Provides a generic `ItemList` component for displaying lists of {@link Record}s.
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Record, Iterable, List } from 'immutable';
import cx from 'classnames';
import css from './itemlist.scss';

const components = ({ component: ItemComponent, items, style }) =>
  items.map((item) => (
    <li className={css.item}>
      <ItemComponent {...{ item, style }} key={item.hashCode()} />
    </li>
  ));

components.propTypes = {
  component: PropTypes.func,
  items: PropTypes.oneOfType([PropTypes.array, ImmutablePropTypes.list]),
  style: PropTypes.object
};

const EmptyItem = (props) => (
  <div>
    No items.
  </div>
);

/**
 * @param props
 * @returns {*}
 * @constructor
 * @since 0.3.0
 */
const ItemList = (props) => {
  const items = props.items;
  const isRecord = items.first() instanceof Record;
  const hasItems = !!items && items.size > 0;

  if (!hasItems) {
    const EmptyComponent = !!props.emptyComponent ? props.emptyComponent : EmptyItem;
    return <EmptyComponent />;
  }

  const classNames = [
    css.itemList,
    css[props.direction]
  ];

  return (
    <ul className={cx(classNames)} style={props.style}>
      {components({
        component: props.itemComponent,
        style: props.itemStyle,
        items: props.items
      })}
    </ul>
  );
};

ItemList.propTypes = {
  items: ImmutablePropTypes.listOf(ImmutablePropTypes.record, ImmutablePropTypes.iterable),
  itemComponent: PropTypes.func.isRequired,
  emptyComponent: PropTypes.element,
  style: PropTypes.object,
  itemStyle: PropTypes.object,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string
};

export default ItemList;

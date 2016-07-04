/**
 * @overview
 *  Provides a basic `ListItem` component to be used as children of
 *  `List` components.
 *
 * @since 0.4.0
 */
import React, { DOM, PropTypes } from 'react';

export const ListType = {
  UNORDERED: 'UNORDERED',
  ORDERED: 'ORDERED',
  DEFINITION: 'DEFINITION'
};

const ListItemFactories = {
  [ListType.UNORDERED]: DOM.li,
  [ListType.ORDERED]: DOM.li,
  [ListType.DEFINITION]: () => console.warn('NYI')
};

const ListItemComponent = (props) => {
  const { children, ...rest } = props;
  return (
    <li {...rest}>
      {children}
    </li>
  );
};

ListItemComponent.propTypes = {
  children: PropTypes.any,
  type: PropTypes.oneOf(['ul', 'ol', 'dl'])
};

export default ListItemComponent;

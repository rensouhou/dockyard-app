/**
 * @overview
 *  Provides a basic `ListItem` component to be used as children of
 *  `List` components.
 *
 * @since 0.4.0
 */
import React, { PropTypes } from 'react';

const ListItemComponent = (props) => {
  const { children } = props;
  return (
    <li>
      {children}
    </li>
  );
};

ListItemComponent.propTypes = {
  children: PropTypes.any
};

export default ListItemComponent;

/**
 * @overview
 * @since 0.4.0
 */
import React, { DOM, PropTypes } from 'react';

export const ListType = {
  UNORDERED: 'UNORDERED',
  ORDERED: 'ORDERED',
  DEFINITION: 'DEFINITION'
};

const ListFactories = {
  [ListType.UNORDERED]: DOM.ul,
  [ListType.ORDERED]: DOM.ol,
  [ListType.DEFINITION]: DOM.dl
};

const ListComponent = (props) => {
  console.log('ListComponent =>', props);
  let listType = 'unordered';

  if (!!props.type) {
    listType = props.type;
  }

  const { children, ...rest } = props;

  const fn = ListFactories[listType];

  if (!!fn) {
    return fn({ rest }, children);
  }

  console.warn('Unknown `ListType` given; ', listType);
  return (
    <div>Unknown <code>ListType</code> given; <code>{listType}</code></div>
  );
  // switch (listType) {
  //   case ListType.UNORDERED:
  //     listEl = DOM.ul({ rest }, children);
  //     break;
  //   case ListType.ORDERED:
  //     listEl = DOM.ol({ rest }, children);
  //     break;
  //   case ListType.DEFINITION:
  //   default:
  //     break;
  // }
  //
  // return listEl;
};

ListComponent.propTypes = {
  type: PropTypes.oneOf([ListType.UNORDERED, ListType.ORDERED, ListType.DEFINITION]),
  children: PropTypes.any
};

export default ListComponent;

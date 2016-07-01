/**
 * @overview
 * @since 0.3.0
 */

import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ItemList from '../itemlist';

const SingleResourceComponent = (props) => (
  <div>{props.item.get('name')}: {props.item.get('value')}</div>
);

SingleResourceComponent.propTypes = {
  item: ImmutablePropTypes.mapContains({
    name: PropTypes.string.isRequired,
    value: PropTypes.number
  })
};

const ResourceComponent = (props) => {
  if (!props.record) {
    return <div>No resources</div>;
  }

  const items = props.record
                     .entrySeq()
                     .toList()
                     .map(([k, v]) => Map.of('name', k, 'value', v));

  return (
    <ItemList itemComponent={SingleResourceComponent} items={items} />
  );
};

ResourceComponent.propTypes = {
  record: ImmutablePropTypes.record.isRequired
};

export default ResourceComponent;

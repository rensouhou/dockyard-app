/**
 * @overview
 * @since 0.3.0
 */

import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ItemList, Label, Text } from '../';

const SingleResourceComponent = (props) => (
  <div>
    <Text>
      {props.item.get('name')}
    </Text>
    <Label text={props.item.get('value')} fullwidth />
  </div>
);

SingleResourceComponent.propTypes = {
  item: ImmutablePropTypes.mapContains({
    name: PropTypes.string.isRequired,
    value: PropTypes.number
  })
};

/**
 * @param props
 * @returns {*}
 * @constructor
 * @since 0.3.0
 */
const ResourceComponent = (props) => {
  if (!props.record) {
    return <div>No resources</div>;
  }

  const items = props.record
                     .entrySeq()
                     .toList()
                     .map(([k, v]) => Map.of('name', k, 'value', v));

  return (
    <ItemList
      itemComponent={SingleResourceComponent}
      items={items}
      direction={'horizontal'}
    />
  );
};

ResourceComponent.propTypes = {
  record: ImmutablePropTypes.record.isRequired
};

export default ResourceComponent;

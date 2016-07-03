/**
 * @overview
 *  Provides a `<Fleet />` component to display a fleet of `0-6` ships.
 *  Additionally, shows extra information about the fleet.
 *
 * @since 0.1.0
 * @version 0.3.0
 */
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ItemList } from '../';
import { Flex } from '../../dom';
import Ship from './ship';
import css from './fleet.scss';

/**
 * @type {function}
 * @param {Object} props
 * @property {FleetRecord} props.record
 * @constructor
 * @since 0.1.0
 * @version 0.3.0
 */
const FleetComponent = (props) => {
  const { record } = props;
  const hasRecord = !!record;

  if (!hasRecord) {
    return <div>No fleet.</div>;
  }

  const itemList = hasRecord
    ? <ItemList items={record.get('ships')} itemComponent={Ship} />
    : <div>Empty fleet.</div>;

  return (
    <div className={css.ships}>
      <Flex justifyContent="space-between">
        <div>{record.get('name')}</div>
        <div>{record.getIn(['meta', 'fighterPower'])}</div>
      </Flex>
      {itemList}
    </div>
  );
};

FleetComponent.propTypes = {
  record: ImmutablePropTypes.record
};

export default FleetComponent;

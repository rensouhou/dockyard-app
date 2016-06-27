/* eslint no-nested-ternary: 0 */
/**
 * @overview
 * @since 0.3.0
 */
import React from 'react';
import R from 'ramda';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { StaticPanel } from '../../';
import { QuestState } from '../../../../constants';

const { cond, equals, always, T } = R;

/**
 * @type {function}
 * @param {QuestRecord} record
 * @returns {XML}
 * @constructor
 * @since 0.3.0
 */
const Quest = ({ record }) => {
  const { id, title, state } = record;
  const statusFn = cond([
    [equals(QuestState.IN_PROGRESS), always('In progress')],
    [equals(QuestState.COMPLETED), always('Completed')],
    [T, always('')]
  ]);
  return (
    <StaticPanel title={`Quest #${id}`}>
      {title} / {statusFn(state)}
    </StaticPanel>
  );
};

Quest.propTypes = {
  record: ImmutablePropTypes.record
};

/**
 * @type {function}
 * @param props
 * @returns {XML}
 * @constructor
 * @since 0.3.0
 */
const QuestList = (props) => (
  <StaticPanel title="Quests">
    {props.records.map((quest) => (
      <Quest record={quest} key={`quest-${quest.id}`} />
    ))}
  </StaticPanel>
);

QuestList.propTypes = {
  records: ImmutablePropTypes.listOf(ImmutablePropTypes.record)
};

export { QuestList, Quest };

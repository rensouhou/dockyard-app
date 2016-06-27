/* eslint no-nested-ternary: 0 */
/**
 * @overview
 * @since 0.3.0
 */
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { StaticPanel } from '../../';
import { QuestState } from '../../../../constants';

const Quest = ({ record }) => {
  const { id, title, state } = record;
  const status = (state === QuestState.IN_PROGRESS)
    ? 'In progress' : (state === QuestState.COMPLETED)
                   ? 'Done' : '';
  return (
    <StaticPanel title={`Quest #${id}`}>
      {title} / {status}
    </StaticPanel>
  );
};

Quest.propTypes = {
  record: ImmutablePropTypes.record
};

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

/* eslint no-nested-ternary: 0 */
/**
 * @overview
 * @since 0.3.0
 */
import React from 'react';
import R from 'ramda';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { StaticPanel, Label } from '../../';
import { QuestState } from '../../../../constants';

const { cond, equals, always, T } = R;

/**
 * @type {function}
 * @param {Object} props
 * @property {QuestRecord} props.item
 * @returns {XML}
 * @constructor
 * @since 0.3.0
 */
const Quest = (props) => {
  const { title, state } = props.record;
  const statusFn = cond([
    [equals(QuestState.IN_PROGRESS), always('0/1')],
    [equals(QuestState.COMPLETED), always('1/1')],
    [T, always('')]
  ]);
  return (
    <tr>
      <td style={{ width: '25%', verticalAlign: 'top' }}>
        <Label text={statusFn(state)} fullwidth alignment="center" />
      </td>
      <td>
        {title}
      </td>
    </tr>
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
  <div>
    <table style={{ fontSize: '12px' }}>
      <tbody>
        {props.records.map((quest) => (
          <Quest record={quest} key={quest.hashCode()} />
        ))}
      </tbody>
    </table>
  </div>
);

QuestList.propTypes = {
  records: ImmutablePropTypes.listOf(ImmutablePropTypes.record)
};

export { QuestList, Quest };

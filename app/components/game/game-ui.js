/* eslint no-param-reassign: 0, no-return-assign: 0, no-sequences: 0, no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import { StaticPanel } from '../ui';
import Fleet from '../ui/game/fleet';
import { QuestList } from '../ui/game/quest/quest-list';
import css from './game-ui.scss';

/**
 * @type {function}
 * @param {Object} props
 * @return {IMap<string, *>}
 */
const getPlayer = (props) => props.ui.player || Map();

/**
 * @type {function}
 * @param {Object} props
 * @returns {IList<FleetRecord>}
 */
const getFleets = (props) => getPlayer(props).getIn(['fleets'], List());

/**
 * @type {function}
 * @param {Object} props
 * @return {FleetRecord}
 */
const getMainFleet = (props) => getFleets(props).first();

/**
 * @type {function}
 * @param {Object} props
 * @return {IList<QuestRecord>}
 */
const getActiveQuests = (props) => props.ui.quest.get('activeQuests');

/**
 * Main parent of the UI
 *
 * _Using ES6 classes here instead of stateless functions due to how HMR works in dev_
 *
 * @class GameUIComponent
 * @extends Component
 */
class GameUIComponent extends Component {
  static propTypes = {
    children: PropTypes.any,
    ui: ImmutablePropTypes.map
  };

  render() {
    return (
      <div>
        <div className={css.gameUi}>
          <article>
            <StaticPanel title="Materials" />
            <StaticPanel title="Player" />
            <StaticPanel title="Fleet">
              <Fleet record={getMainFleet(this.props)} />
            </StaticPanel>
          </article>
          <aside>
            <QuestList records={getActiveQuests(this.props)} />
          </aside>
        </div>
      </div>
    );
  }
}

export default GameUIComponent;

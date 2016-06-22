/* eslint no-param-reassign: 0, no-return-assign: 0, no-sequences: 0, no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import { StaticPanel } from '../ui';
import Fleet from '../ui/game/fleet';
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
 * @param {Object} props
 * @returns {XML|JSX.Element}
 * @constructor
 */
const GameUIComponent = (props) => (
  <div className={css.gameUi}>
    <StaticPanel title="Materials" />
    <StaticPanel title="Player" />
    <StaticPanel title="Fleet">
      <Fleet record={getMainFleet(props)} />
    </StaticPanel>
  </div>
);

/**
 * @type {{children: Requireable<any>, ui: *}}
 */
GameUIComponent.propTypes = {
  children: PropTypes.any,
  ui: ImmutablePropTypes.map
};

export default GameUIComponent;

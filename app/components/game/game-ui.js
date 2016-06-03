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

const GameUIComponent = (props) => {
  const fleets = props.ui.getIn(['player', 'fleets'], List());

  return (
    <div className={css.gameUi}>
      <StaticPanel title="Materials" />
      <StaticPanel title="Player" />
      <StaticPanel title="Fleet">
        <Fleet record={fleets.first()} />
      </StaticPanel>
    </div>
  );
};

GameUIComponent.propTypes = {
  children: PropTypes.any,
  ui: ImmutablePropTypes.map
};

export default GameUIComponent;

/* eslint no-param-reassign: 0, no-return-assign: 0, no-sequences: 0, no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';
import { listOrDefault } from '../../helpers';
import { StaticPanel } from '../ui';
import css from './game-ui.scss';

const { indexOf, isEmpty, prop, pathOr, not } = R;

const GameUIComponent = (props) => {
  const fleets = listOrDefault(props, 'uiState', 'player', 'fleets');
  // @todo Move this outside
  // fleets.slice(0, 1).map(f => (
  //   <StaticPanel title={f.name} className={css.fleetCol}>
  //     <Fleet fleet={f} />
  //   </StaticPanel>
  // ))

  return (
    <div className={css.gameUi}>
      <StaticPanel title="Materials" />
      <StaticPanel title="Player" />
      <StaticPanel title="Fleet">
        TBA
      </StaticPanel>
    </div>
  );
};

GameUIComponent.propTypes = {
  children: PropTypes.any,
  ui: ImmutablePropTypes.map
};

export default GameUIComponent;

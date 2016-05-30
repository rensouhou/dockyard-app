/* eslint no-param-reassign: 0, no-return-assign: 0, no-sequences: 0, no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { PropTypes } from 'react';
import R from 'ramda';
import { listOrDefault } from '../../helpers';
import { StaticPanel } from '../ui';
import css from './game-ui.scss';
import { Fleet } from '../ui/game';

const { indexOf, isEmpty, prop, pathOr, not } = R;

const GameUIComponent = (props) => {
  const fleets = listOrDefault(props, 'uiState', 'player', 'fleets');
  console.log('GameUIComponent.props =>', props);

  // @todo Move this outside
  return (
    <div className={css.gameUi}>
      <StaticPanel title="Materials" />
      <StaticPanel title="Player" />
      <StaticPanel title="Fleet">
        <div className={css.fleetCols}>
          {fleets.map(f => (
            <StaticPanel title={f.name} className={css.fleetCol}>
              <Fleet fleet={f} />
            </StaticPanel>
          ))}
        </div>
      </StaticPanel>
    </div>
  );
};

GameUIComponent.propTypes = {
  children: PropTypes.any,
  appState: PropTypes.object,
  uiState: PropTypes.object
};

export default GameUIComponent;

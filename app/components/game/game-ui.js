/* eslint no-param-reassign: 0, no-return-assign: 0, no-sequences: 0, no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { StaticPanel } from '../ui';
import css from './game-ui.scss';
import { Fleet } from '../ui/game';

const { indexOf, isEmpty, prop, path, not } = R;

export default class GameUI extends Component {
  static propTypes = {
    children: PropTypes.any,
    appState: PropTypes.any,
    uiState: PropTypes.any
  };

  /**
   * @returns {JSX.Element}
   */
  render() {
    const fleets = R.pathOr([], ['uiState', 'player', 'fleets'], this.props);
    const mainFleet = R.head(fleets);
    const mainFleetShips = R.propOr([], 'ships', mainFleet);
    const kakkosFleet = R.not(R.isEmpty(fleets)) ? fleets[1] : {};
    const kakkosFleetShips = R.propOr([], 'ships', kakkosFleet);

    // @todo Move this outside
    return (
      <div className={css.gameUi}>
        <StaticPanel title="Materials">
        </StaticPanel>
        <StaticPanel title="Player">
        </StaticPanel>
        <StaticPanel title="Fleet">
          <Fleet fleet={mainFleet} />
        </StaticPanel>
        <StaticPanel title="Kakkos fleet">
          <Fleet fleet={kakkosFleet} />
        </StaticPanel>
      </div>
    );
  }
}

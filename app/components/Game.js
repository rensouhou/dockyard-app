/* eslint no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { StaticPanel } from './ui';
import GameView from './game/game-view';
import { Fleet, MaterialDisplay } from './ui/game';
import style from './Game.scss';

export default class Game extends Component {
  static propTypes = {
    actions: PropTypes.object,
    game: PropTypes.any,
    transformerActions: PropTypes.any,
    appState: PropTypes.object
  };

  isInitialized = ():boolean => R.complement(R.isEmpty(R.pathOr([], ['appState'], this.props)));

  renderMainFleet = (fleet):?Fleet =>
    R.isEmpty(fleet)
      ? null
      : <Fleet {...fleet} />;

  render() {
    if (!this.isInitialized()) {
      return <div>Not initialized yet.</div>;
    }

    const { transformerActions, game, actions } = this.props;
    const { player } = this.props.appState;

    return (
      <div className={style.container}>
        <GameView
          actions={actions}
          game={game}
          transformerActions={transformerActions}
        />
        <StaticPanel title="Resources">
          <MaterialDisplay data={player.materials} />
        </StaticPanel>
        <StaticPanel title="MainFleet">
          {this.renderMainFleet(R.head(R.pathOr([], ['props', 'appState', 'player', 'fleets'], this)))}
        </StaticPanel>
      </div>
    );
  }
}

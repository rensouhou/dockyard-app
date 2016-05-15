/* eslint no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { StaticPanel } from './ui';
import { GameState } from '../actions/game';
import GameView from './game/game-view';
import { Fleet, MaterialDisplay } from './ui/game';
import style from './Game.scss';

export default class Game extends Component {
  static propTypes = {
    actions: PropTypes.object,
    game: PropTypes.any,
    transformerActions: PropTypes.any,
    appState: PropTypes.object,
    gameEntities: PropTypes.object
  };

  isInitialized = () => R.complement(R.isEmpty(R.pathOr([], ['appState'], this.props)));

  renderMainFleet = (fleet) =>
    R.isEmpty(fleet)
      ? null
      : <Fleet {...fleet} />;

  renderBody() {
    const { transformerActions, game, actions, gameEntities } = this.props;
    const { player } = this.props.appState;

    const getFirstFleet = R.head(
      R.pathOr(
        [], ['props', 'appState', 'player', 'fleets'], this)
    );
    const getFleetShips = (ships, shipEntities) => R.pick(ships, shipEntities);

    const f = R.head(R.pathOr([], ['props', 'appState', 'player', 'fleets'], this));
    const ships = R.values(
      getFleetShips(
        getFirstFleet.ships,
        gameEntities.entities.ships
      )
    );

    return (
      <div className={style.uiBody}>
        <StaticPanel title="Resources">
          <MaterialDisplay data={player.materials} />
        </StaticPanel>
        <StaticPanel title="MainFleet" style={{ marginTop: '0.75rem' }}>
          {this.renderMainFleet({ ...f, ships })}
        </StaticPanel>
      </div>
    );
  }

  // @todo(@stuf): make use of monads or something to ease up on the required null-checking festa
  render() {
    let body = null;
    const { transformerActions, game, actions, gameEntities } = this.props;
    if (!this.isInitialized() || this.props.appState.gameState === GameState.UNINITIALIZED ||
      this.props.appState.gameState === GameState.STARTING_GAME) {
      body = <div>Not initialized yet.</div>;
    }
    else {
      body = this.renderBody();
    }

    return (
      <div className={style.container}>
        <GameView
          actions={actions}
          game={game}
          transformerActions={transformerActions}
        />
        {body}
      </div>
    );
  }
}

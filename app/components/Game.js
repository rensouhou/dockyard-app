/* eslint no-confusing-arrow: 0, no-underscore-dangle: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import S from 'sanctuary';
import { StaticPanel, FunctionalityTestPanel } from './ui';
import { GameStates } from '../actions/game';
import GameView from './game/game-view';
import GameUI from './game/game-ui';
import { Fleet, MaterialDisplay, PlayerInfo } from './ui/game';
import css from './Game.scss';

const _ = R.__;

export default class Game extends Component {
  static propTypes = {
    children: PropTypes.element,
    actions: PropTypes.object,
    game: PropTypes.any,
    transformerActions: PropTypes.any,
    appState: PropTypes.object,
    gameEntities: PropTypes.object
  };

  getMaybe = (path, props) => {
    const value = R.path([...path], props);
    return R.isEmpty(value) ? S.Nothing() : S.Just(value);
  };

  isProperlyInitialized = (props = this.props) => R.isEmpty(props)
    ? S.Maybe.empty()
    : S.Maybe.of(props);

  isInitialized = () => R.complement(R.isEmpty(R.pathOr([], ['appState'], this.props)));

  renderMainFleet = (fleet) =>
    R.isEmpty(fleet)
      ? null
      : <Fleet {...fleet} />;

  renderBody() {
    const { transformerActions, game, actions, gameEntities, appState } = this.props;
    const { player } = this.props.appState;

    const getFirstFleet = R.head(
      R.pathOr(
        [], ['props', 'appState', 'player', 'fleets'], this)
    );

    const getFleetShips = (ships, shipEntities) => R.pick(ships, shipEntities);
    // @todo(@stuf): get the proper index
    const mergeBaseFn = baseData =>
      entity =>
        ({
          ...baseData[entity.id],
          ...entity
        });

    const mergeBase = S.Just(mergeBaseFn(gameEntities.entities.ships));

    const getMainFleetM = S.head(R.path(['props', 'appState', 'player', 'fleets'], this))
                           .map(x => x.ships);
                           // .map(xs => mergeBase.ap(xs));

    const f = R.head(R.pathOr([], ['props', 'appState', 'player', 'fleets'], this));
    const ships = R.values(
      getFleetShips(
        getFirstFleet.ships,
        gameEntities.entities.ships
      )
    );

    const playerInfoProps = {
      profile: player.profile,
      ships: player.ships.length,
      slotItems: player.slotItems.length
    };

    return (
      <div className={css.uiBody}>
        <FunctionalityTestPanel actions={actions} appState={appState} />
        <StaticPanel title="Player data">
          <PlayerInfo {...playerInfoProps} />
        </StaticPanel>
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
    if (!this.isInitialized() || this.props.appState.gameState === GameStates.UNINITIALIZED ||
      this.props.appState.gameState === GameStates.STARTING_GAME) {
      body = <div>Not initialized yet.</div>;
    }
    else {
      body = this.renderBody();
    }
    console.log(this.props);

    return (
      <div className={css.container}>
        <GameView
          actions={actions}
          game={game}
          transformerActions={transformerActions}
        />
        <GameUI appState={this.props.appState} />
      </div>
    );
  }
}

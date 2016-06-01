/* eslint no-confusing-arrow: 0, no-underscore-dangle: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import GameView from './game/game-view';
import GameUI from './game/game-ui';
import css from './Game.scss';

export default class Game extends Component {
  static propTypes = {
    children: PropTypes.element,
    actions: PropTypes.object,
    game: PropTypes.any,
    transformerActions: PropTypes.any,
    appState: PropTypes.object,
    ui: PropTypes.object,
    gameEntities: PropTypes.object
  };

  isInitialized = () => R.complement(R.isEmpty(R.pathOr([], ['appState'], this.props)));

  // @todo(@stuf): make use of monads or something to ease up on the required null-checking festa
  render() {
    const { transformerActions, game, actions } = this.props;
    console.group('GameComponent UI State');
    console.log(this.props.ui);
    console.groupEnd();
    if (!this.isInitialized()) {
      return (
        <div>Not ready yet.</div>
      );
    }
    return (
      <div className={css.container}>
        <GameView
          actions={actions}
          game={game}
          transformerActions={transformerActions}
        />
        <GameUI appState={this.props.appState} uiState={this.props.ui} />
      </div>
    );
  }
}

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

const isInitialized = (props) => R.complement(R.isEmpty(R.pathOr([], ['application'], props)));

/**
 * @class GameComponent
 * @extends Component
 */
class GameComponent extends Component {
  static propTypes = {
    ui: PropTypes.object,
    actions: PropTypes.object
  };

  /**
   * @returns {XML|JSX.Element|ReactComponent}
   * @constructor
   * @version 0.2.0
   */
  render() {
    if (!isInitialized(this.props)) {
      return (
        <div>Not ready yet.</div>
      );
    }

    console.log('GameComponent.props =>', this.props);

    return (
      <div className={css.container}>
        <GameView actions={this.props.actions.application} transformerActions={this.props.actions.transformers} />
        <GameUI ui={this.props.ui} />
      </div>
    );
  }
}

export default GameComponent;

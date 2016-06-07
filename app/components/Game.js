/* eslint no-confusing-arrow: 0, no-underscore-dangle: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { PropTypes } from 'react';
import R from 'ramda';
import GameView from './game/game-view';
import GameUI from './game/game-ui';
import css from './Game.scss';

const logProps = (props) => {
  console.groupCollapsed('GameComponent');
  console.log('props\t=>', props);
  console.groupEnd();
};

const isInitialized = (props) => R.complement(R.isEmpty(R.pathOr([], ['appState'], props)));

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const GameComponent = (props) => {
  logProps(props);

  if (!isInitialized(props)) {
    return (
      <div>Not ready yet.</div>
    );
  }

  return (
    <div className={css.container}>
      <GameView actions={props.actions.application} transformerActions={props.actions.transformers} />
      <GameUI ui={props.ui} />
    </div>
  );
};

GameComponent.propTypes = {
  ui: PropTypes.object,
  actions: PropTypes.object
};

export default GameComponent;

import React, { Component, PropTypes } from 'react';
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

  render() {
    return (
      <div className={style.container}>
        <GameView
          actions={this.props.actions}
          game={this.props.game}
          transformerActions={this.props.transformerActions}
        />
        <StaticPanel title="Resources">
          <MaterialDisplay data={this.props.appState.player.materials} />
        </StaticPanel>
        <StaticPanel title="MainFleet">
          <Fleet />
        </StaticPanel>
      </div>
    );
  }
}

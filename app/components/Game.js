import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './game.css';

export default class Game extends Component {
  // The webview needs to be appended as a vanilla DOM element,
  // since the `plugins` attribute does not work if mounted through React.
  componentDidMount() {
    const { gameViewHolder } = this.refs;
    // const { actions, game, transformerActions } = this.props;
    const view = Object.assign(document.createElement('webview'), {
      nodeintegration: true,
      plugins: true,
      partition: 'persist:kc',
      src: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/'
    });
    // view.addEventListener('dom-ready', createGameViewHandler({ game, transformerActions }, config));
    findDOMNode(gameViewHolder).appendChild(view);
    // actions.registerGameView(view);
  }

  render() {
    return <div ref="gameViewHolder" id="game-view-holder"></div>;
  }
}

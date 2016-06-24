/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { createGameViewHandler } from '../../core/game-data-handler';
import config from '../../config';
import './game-view.scss';

/**
 * Public-facing game view component that contains the
 * game frame.
 * @class GameView
 * @extends Component
 */
export default class GameView extends Component {
  static propTypes = {
    actions: PropTypes.object,
    transformerActions: PropTypes.any
  };

  /**
   * Create the `webview` that will contain the game itself.
   * The `webview` element needs to be appended as a vanilla DOM element,
   * since otherwise the `plugins` attribute stops working, if mounted
   * through React.
   */
  componentDidMount() {
    const { gameViewHolder } = this.refs;
    const { actions, transformerActions } = this.props;
    const view = Object.assign(document.createElement('webview'), {
      nodeintegration: true,
      plugins: true,
      partition: 'persist:kc',
      src: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/'
    });
    view.addEventListener('dom-ready', createGameViewHandler({ transformerActions }, config));
    findDOMNode(gameViewHolder).appendChild(view);
    actions.registerGameView(view);
  }

  /**
   * @returns {XML|JSX.Element}
   */
  render() {
    return <div ref="gameViewHolder" id="game-view-holder"></div>;
  }
}

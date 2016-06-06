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

export default class GameView extends Component {
  static propTypes = {
    actions: PropTypes.object,
    transformerActions: PropTypes.any
  };

  // The webview needs to be appended as a vanilla DOM element,
  // since the `plugins` attribute does not work if mounted through React.
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

  render() {
    return <div ref="gameViewHolder" id="game-view-holder"></div>;
  }
}

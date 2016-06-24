/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { Component, PropTypes } from 'react';
import { StaticPanel } from '../';
import css from './player-info.scss';

/**
 * @class PlayerInfoComponent
 * @extends Component
 */
export default class PlayerInfoComponent extends Component {
  static propTypes = {
    profile: PropTypes.object,
    ships: PropTypes.number,
    slotItems: PropTypes.number
  };

  render() {
    const { ships, slotItems, nickname, level, limits } = this.props.profile;

    return (
      <div className={css.playerInfo}>
        <StaticPanel title="Name">
          <div>{nickname}</div>
        </StaticPanel>
        <StaticPanel title="Level">
          {level}
        </StaticPanel>
        <StaticPanel title="Ships">
          {this.props.ships} / {limits.maxShips}
        </StaticPanel>
        <StaticPanel title="SlotItems">
          {this.props.slotItems} / {limits.maxSlotItems}
        </StaticPanel>
      </div>
    );
  }
}

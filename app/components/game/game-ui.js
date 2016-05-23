/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import m from 'monet';
import { StaticPanel } from '../ui';
import css from './game-ui.scss';
import { MaterialDisplay, PlayerInfo } from '../ui/game';

const { Maybe } = m;

const getMaybe = (props, ...path) => {
  const result = R.path(path, props);
  if (!result || R.isEmpty(result)) {
    return Maybe.None();
  }
  return Maybe.Some(result);
};

export default class GameUI extends Component {
  static propTypes = {
    children: PropTypes.any,
    appState: PropTypes.any
  };

  render() {
    const appState = getMaybe(this.props, 'appState');
    const player = appState.flatMap(o => getMaybe(o, 'player'));
    const fleets = player.flatMap(o => getMaybe(o, 'fleets'));
    const materials = player.flatMap(o => getMaybe(o, 'materials'));
    const mainFleet = fleets.ap(Maybe.Some(it => R.head(it)));
    console.log({ player, fleets, mainFleet });

    const getKeyAp = key => Maybe.Some(it => it[key]);
    const getFromM = (M, k) => M.ap(getKeyAp(k));
    const getFrom = (M, k, def) => getFromM(M, k).orSome(def);

    // @todo Move this outside
    return (
      <div className={css.gameUi}>
        <StaticPanel title="Materials">
          <MaterialDisplay data={materials} />
        </StaticPanel>
        <StaticPanel title="Player">
          <PlayerInfo
            ships={getFrom(player, 'ships', []).length}
            slotItems={Object.keys(getFrom(player, 'slotItems', {})).length}
            profile={getFrom(player, 'profile', {})}
          />
        </StaticPanel>
        <StaticPanel title="Fleet">
          fleet
        </StaticPanel>
      </div>
    );
  }
}

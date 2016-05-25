/* eslint no-param-reassign: 0, no-return-assign: 0, no-sequences: 0, no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import S from 'sanctuary';
import m from 'monet';
import { StaticPanel } from '../ui';
import css from './game-ui.scss';
import { MaterialDisplay, PlayerInfo, Fleet } from '../ui/game';

const mMaybe = m.Maybe;
const { indexOf, isEmpty, prop, path, not } = R;
const { Maybe, Just, Nothing, Either, Left, Right } = S;

const getMaybe = (props, ...path) => {
  const result = R.path(path, props);
  if (!result || R.isEmpty(result)) {
    return mMaybe.None();
  }
  return mMaybe.Some(result);
};

export default class GameUI extends Component {
  static propTypes = {
    children: PropTypes.any,
    appState: PropTypes.any
  };

  /**
   * @returns {ReactElement}
   */
  render() {
    const _method = 'GameUI#render';
    console.group(_method);
    console.time(_method);
    const appState = getMaybe(this.props, 'appState');
    const player = appState.flatMap(o => getMaybe(o, 'player'));
    const fleets = player.flatMap(o => getMaybe(o, 'fleets'));
    const materials = player.flatMap(o => getMaybe(o, 'materials'));
    const mainFleet = fleets.ap(mMaybe.Some(it => R.head(it)));
    const mainFleetShips = mainFleet.flatMap(o => getMaybe(o, 'ships'));

    const getKeyAp = key => mMaybe.Some(it => it[key]);
    const getFromM = (M, k) => M.ap(getKeyAp(k));
    const getFrom = (M, k, def) => getFromM(M, k).orSome(def);

    const testValue = 'herpy derp';
    const testM = S.Maybe.of(testValue);
    console.log('testM =>', testM);
    const chainedTestM = testM.chain(it => S.Maybe.of(it));
    console.log('chainedTestM =>', chainedTestM);
    const mappedTestM = testM.map(it => ({ it }));
    console.log('mappedTestM =>', mappedTestM);
    const apTestM = S.Maybe.of(it => [it, it]).ap(testM);
    console.log('apTestM =>', apTestM);

    const shipsM = getFromM(player, 'ships');
    const shipCount = shipsM.orSome([]).length;
    const slotItemsM = getFrom(player, 'slotItems', {});
    const slotItemCount = Object.keys(slotItemsM).length;
    const profile = getFrom(player, 'profile', {});

    // Main fleet -stuff
    const getShipPicker = (shipIds) => (acc, it) => (indexOf(it.id, shipIds) !== -1 ? acc = acc.concat(it) : acc, acc);

    const mainFleetShipsList = shipsM.ap(
      mMaybe.Just(sl => sl.reduce(
        getShipPicker(mainFleetShips.orJust([])),
        [])));
    console.log('props =>', this.props);
    console.timeEnd();
    console.groupEnd();

    // @todo Move this outside
    return (
      <div className={css.gameUi}>
        <StaticPanel title="Materials">
          <MaterialDisplay data={materials} />
        </StaticPanel>
        <StaticPanel title="Player">
          <PlayerInfo
            ships={shipCount}
            slotItems={slotItemCount}
            profile={profile}
          />
        </StaticPanel>
        <StaticPanel title="Fleet">
          <Fleet fleetM={mainFleet} shipsM={mainFleetShipsList} />
        </StaticPanel>
      </div>
    );
  }
}

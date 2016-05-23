/* eslint no-console: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { StaticPanel } from '../';
import style from './material-display.scss';

export default class MaterialDisplay extends Component {
  static propTypes = {
    data: PropTypes.any,
    state: PropTypes.arrayOf(PropTypes.object)
  };

  materialElement = (it) => {
    console.log('materialElement =>', it);
    return (
      <StaticPanel title={it.key}>
        <div>{it.val}</div>
      </StaticPanel>
    );
  };

  render() {
    if (this.props.data.isNone()) {
      return (<div>nope</div>);
    }

    const materials = R.map(it => (
      <StaticPanel title={it[0]} key={it[0]} className={style.materialElem}>
        <div className={style.materialCount}>{it[1]}</div>
      </StaticPanel>
    ), R.toPairs(this.props.data.orSome({})));

    return (
      <div className={style.materialDisplay}>
        {materials}
      </div>
    );
  }
}

/* eslint no-console: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';
import { StaticPanel } from '../';
import css from './material-display.scss';

// region # <MaterialElement !title !amount />
const MaterialElement = (props) => (
  <StaticPanel title={props.name}>
    <div className={css.materialCount}>
      {props.amount}
    </div>
  </StaticPanel>
);

MaterialElement.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number
};
// endregion

// region # <MaterialDisplay !materialState />
const MaterialDisplayComponent = (props) => (
  <div className={css.materialDisplay}>
    {props.materialState.map((it) => <MaterialElement title={it.name} amount={0} />)}
  </div>
);

MaterialDisplayComponent.propTypes = {
  materialState: ImmutablePropTypes.record
};
// endregion

export default MaterialDisplayComponent;

/**
 * @class MaterialDisplayComponent
 * @extends Component
 */
export class MaterialDisplay extends Component {
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
      <StaticPanel title={it[0]} key={it[0]} className={css.materialElem}>
        <div className={css.materialCount}>{it[1]}</div>
      </StaticPanel>
    ), R.toPairs(this.props.data.orSome({})));

    return (
      <div className={css.materialDisplay}>
        {materials}
      </div>
    );
  }
}

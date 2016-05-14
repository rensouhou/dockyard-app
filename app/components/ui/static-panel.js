/* eslint no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import React, { PropTypes } from 'react';
import cx from 'classnames';
import style from './static-panel.scss';

const panelTitle = title =>
  !!title
    ? (<header className={style.title}>{title}</header>)
    : null;

const StaticPanel = props => (
  <article className={cx(style.staticPanel, props.className)}>
    {panelTitle(props.title)}
    <div className={style.staticPanelBody}>
      {props.children}
    </div>
  </article>
);

StaticPanel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  title: PropTypes.string
};

export default StaticPanel;

/* eslint no-confusing-arrow: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { PropTypes } from 'react';
import cx from 'classnames';
import css from './static-panel.scss';

const panelTitle = (title) =>
  !!title
    ? (<header className={css.title}>{title}</header>)
    : null;

const StaticPanel = (props) => (
  <article className={cx(css.staticPanel, props.className)} style={props.style}>
    {panelTitle(props.title)}
    <div className={cx(css.staticPanelBody)}>
      {props.children}
    </div>
  </article>
);

StaticPanel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  title: PropTypes.string,
  style: PropTypes.object
};

export default StaticPanel;

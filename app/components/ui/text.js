/**
 * @overview
 * @since 0.3.0
 */
import React, { PropTypes } from 'react';
import cx from 'classnames';
import css from './text.scss';

/**
 * @param {Object} props
 * @property {?string} props.text
 * @property {?string} props.children
 * @property {?string} props.className
 * @property {?string} props.size
 * @returns {XML}
 * @constructor
 */
const TextComponent = (props) => {
  const { text, children, className } = props;

  const classNames = [
    css.text,
    className
  ];

  const body = !!text ? text : children;

  return (
    <div className={cx(classNames)}>
      {body}
    </div>
  );
};

TextComponent.propTypes = {
  text: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'big'])
};

export default TextComponent;

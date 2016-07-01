/**
 * @overview
 * @since 0.3.0
 */
import React, { PropTypes } from 'react';
import css from './label.scss';
import cx from 'classnames';

const LabelComponent = (props) => {
  const text = !!props.children ? props.children : props.text;

  const classNames = [
    css.label,
    props.fullwidth ? css.fullwidth : null,
    !!props.alignment ? css[props.alignment] : null
  ];

  return (
    <div className={cx(classNames)}>
      {text}
    </div>
  );
};

LabelComponent.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.any,
  fullwidth: PropTypes.bool,
  alignment: PropTypes.oneOf(['left', 'center', 'right'])
};

export default LabelComponent;

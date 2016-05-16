/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { PropTypes } from 'react';
import cx from 'classnames';
import s from './button.scss';

const Button = props => {
  const buttonProps = {
    className: cx(s.button, props.className),
    onClick: props.onClickHandler,
    disabled: props.disabled
  };

  return (
    <button {...buttonProps}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onClickHandler: PropTypes.func
};

/**
 * @overview
 * @since 0.4.0
 */
import React, { PropTypes } from 'react';

const getFlexStyle = (props) =>
  JSON.parse(JSON.stringify({
    display: 'flex',
    direction: props.direction,
    justifyContent: props.justifyContent
  }));

const FlexComponent = (props) => (
  <div style={getFlexStyle(props)}>
    {props.children}
  </div>
);

FlexComponent.propTypes = {
  children: PropTypes.any,
  direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
  justifyContent: PropTypes.oneOf(['flex-end', 'flex-start', 'center', 'space-between', 'space-around']),
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  alignItems: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center', 'baseline'])
};

export default FlexComponent;

import React, { PropTypes } from 'react';

/**
 * @type {function}
 * @param {Object} props
 * @returns {XML|JSX.Element}
 */
const AppContainer = (props) => (
  <div>
    {props.children}
    {
      (() => {
        if (process.env.NODE_ENV !== 'production') {
          const DevTools = require('./DevTools');
          return <DevTools />;
        }
      })()
    }
  </div>
);

/** @type {{children: Validator<any>}} */
AppContainer.propTypes = {
  children: PropTypes.element.isRequired
};

export default AppContainer;

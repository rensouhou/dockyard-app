import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import css from './Home.scss';

const HomeComponent = (props) => (
  <div className={css.container}>
    <h2>Dockyard <span className={css.version}>{props.version}</span></h2>
    <div className={css.modeSelect}>
      <Link to="/game">Launch</Link>
      <Link to="/configure">Configuration</Link>
      <Link to="/test">Core</Link>
    </div>
    <footer>github.com/rensouhou/dockyard-app</footer>
  </div>
);

HomeComponent.propTypes = {
  version: PropTypes.string.isRequired
};

export default HomeComponent;

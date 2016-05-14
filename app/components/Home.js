import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.scss';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h2>Dockyard</h2>
        <div className={styles.modeSelect}>
          <Link to="/game">Launch</Link>
          <Link to="/configure">Configuration</Link>
        </div>
        <footer>github.com/rensouhou/dockyard-app</footer>
      </div>
    );
  }
}

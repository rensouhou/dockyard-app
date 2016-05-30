/**
 * @overview
 *
 * @since 0.1.0
 */
import React, { PropTypes } from 'react';
import css from './progress.scss';

const ProgressComponent = (props) => {
  const ratio = (props.value / props.max);
  const percentage = ratio * 100;
  return (
    <div className={css.progress}>
      <div className={css.barHolder}>
        <div className={css.bar} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

ProgressComponent.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default ProgressComponent;

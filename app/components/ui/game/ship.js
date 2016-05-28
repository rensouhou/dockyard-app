/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import React, { PropTypes } from 'react';
import StaticPanel from '../static-panel';
import css from './ship.scss';

const ShipComponent = (props) => {
  const { ship } = props;
  return (
    <StaticPanel title={ship.name.reading} className={css.ship}>
      <div className={css.shipBody}>
        <div>derp</div>
        <div>lerp</div>
      </div>
    </StaticPanel>
  );
};

ShipComponent.propTypes = {
  // ship: PropTypes.instanceOf(Record)
  ship: PropTypes.object.isRequired
};

export default ShipComponent;

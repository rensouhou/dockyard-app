/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import chalk from 'chalk';

const getTime = () => (new Date());
const g = chalk.green;
const gi = chalk.green.inverse;
export const logEvent = (event, msg) => `${g('event')} ${gi(event)}: ${msg}`;



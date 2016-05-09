/**
 * @overview
 *  Handler for `START_SORTIE` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import warning from 'warning';

export default function START_SORTIE({ body, postBody }) {
  warning(false, `Fix this action handler: ${START_SORTIE.name}`);

  return {
    body, postBody
  };
}

/**
 * @overview
 *  Handler for `START_SORTIE` event
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
export default function START_SORTIE({ body, postBody }) {
  return {
    body, postBody
  };
}

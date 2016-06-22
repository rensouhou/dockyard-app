/**
 * @overview
 */
import { fromJS } from 'immutable';

/**
 * @param {ApiActionRecord} p
 * @returns {any}
 * @constructor
 */
export default function GET_FLEET_DATA(p) {
  const { body, postBody } = p;
  return fromJS({
    body,
    postBody
  });
}

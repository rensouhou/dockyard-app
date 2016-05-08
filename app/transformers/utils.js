/// <reference path="../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/utils
 */
import deepAssign from 'deep-assign';

export const deepMerge = (state, ...mergeables) => deepAssign({}, state, mergeables);

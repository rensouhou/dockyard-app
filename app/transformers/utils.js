import deepAssign from 'deep-assign';

export const deepMerge = (state, ...mergeables) => deepAssign({}, state, mergeables);

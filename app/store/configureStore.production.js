/**
 * @overview
 *  Store configuration for `production` environment.
 *
 * @since 0.1.0
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../reducers';

const router = routerMiddleware(hashHistory);

/** @type {StoreEnhancer} */
const enhancer = applyMiddleware(thunk, promiseMiddleware, router);

/**
 * @param {Map<string, *>} initialState
 * @returns {Store}
 */
export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

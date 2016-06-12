/**
 * @overview
 *
 * @since 0.1.0
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createCraftLogger from '../core/middleware/craft-logger';
import promiseMiddleware from 'redux-promise';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import perflogger from 'redux-perf-middleware';
import Immutable from 'immutable';
import installImmutableDevTools from 'immutable-devtools';

installImmutableDevTools(Immutable);

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const router = routerMiddleware(hashHistory);

const craftingLogger = createCraftLogger();

const enhancer = compose(
  applyMiddleware(thunk, perflogger, promiseMiddleware, router, logger),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}

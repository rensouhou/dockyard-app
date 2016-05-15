import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import { pages } from './containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={pages.HomePage} />
    <Route path="/configure" component={pages.ConfigurePage} />
    <Route path="/game" component={pages.GamePage} />
    <Route path="/test" component={pages.TestPage} />
  </Route>
);

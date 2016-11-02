[![Build Status](https://travis-ci.org/rensouhou/dockyard-app.svg?branch=master)](https://travis-ci.org/rensouhou/dockyard-app)
[![Dependency Status](https://gemnasium.com/badges/github.com/rensouhou/dockyard-app.svg)](https://gemnasium.com/github.com/rensouhou/dockyard-app)
[![Code Climate](https://codeclimate.com/github/rensouhou/dockyard-app/badges/gpa.svg)](https://codeclimate.com/github/rensouhou/dockyard-app)
[![Test Coverage](https://codeclimate.com/github/rensouhou/dockyard-app/badges/coverage.svg)](https://codeclimate.com/github/rensouhou/dockyard-app/coverage)
[![Issue Count](https://codeclimate.com/github/rensouhou/dockyard-app/badges/issue_count.svg)](https://codeclimate.com/github/rensouhou/dockyard-app)

# Dockyard.app

Attempt at a somewhat saner handling of Kancolle API data. This is my initial attempt at an Electron-based
React application. Some of the core transforming code here is of legacy quality, since the network data capturing
and parsing is taken from an older, Chrome Extension -based implementation that I've made earlier.

Being a bit better versed in the world of React and Electron, this will most likely get a much more functional
rewrite for better handling optional data and the general weirdness of the "API" being used here. Plans include
better use of Ramda + Sanctuary and/or other monadic libraries alongside Ramda. 

## Notes

Some things that follow conventions much better than the rest. 

 * The [selectors](app/selectors) for transforming data to the view. For example the [player data selectors](app/selectors/player.js)
 * The API data [parsers/transformers](app/transformers/api) work as pure functions in the sense that
   they don't rely on anything related to game- or application state.
 * When an API action is received, it's handled in the [action creator](app/actions/api-actions.js), which in this case
   works as a "meta handler", e.g. it's a [Keyed `Seq`](https://facebook.github.io/immutable-js/docs/#/Seq) passed
   to where the action is being dispatched.
 * The action itself is looked up and dispatched in the (now horribly messy) [game data handler](app/core/game-data-handler.js#L158-L165)

In general, this was a useful foray into the world of React and Electron, but due to this being my first bigger Electron project, there
are a number of things that are pretty messy. This will most likely end up as being a rewrite of this application to get a clean slate
to work from (and this being a personal project).

## Changelog

See the file [CHANGELOG.md](CHANGELOG.md).

## Acknowledgements

 * Thanks to [C. T. Lin](http://github.com/chentsulin) for creating the excellent base project that is
   [React Electron Boilerplate](https://github.com/chentsulin/electron-react-boilerplate) — saved lots
   of sanity points not having to reinvent the wheel on this one.

## Maintainers

/* eslint no-unused-vars: 0 */
/**
 * @overview
 *  Type definitions
 *
 * @since 0.1.0
 * @module app/typedef/typedef-2
 */
// noinspection ES6UnusedImports

/**
 * @typedef {Object} UIStateProps
 * @property {Map<string, *>} ui
 */

/**
 * @typedef {Map<string, *>} UIState
 * @property {Map<string, *>} UIStatePlayer
 */

// Player records
// --------------
/**
 * Base record type that all other records derive from.
 * @typedef {Object|Record.Class} BaseRecord
 */

/**
 * @typedef {BaseRecord} FleetRecord
 * @property {number} flagship
 * @property {number} id
 * @property {number} memberId
 * @property {List<number>} mission
 * @property {string} name
 * @property {List<ShipRecord>} ships
 */

/**
 * @typedef {BaseRecord} ShipRecord
 */

/**
 * @typedef {BaseRecord} SlotItemRecord
 */

/**
 * @typedef {BaseRecord} DockRecord
 */

/**
 * @typedef {BaseRecord} QuestRecord
 */

/**
 * @typedef {BaseRecord} CreatedEntityRecord
 */

/**
 * @typedef {BaseRecord} ApplicationStateRecord
 * @property {string} gameState - the "state" of the SWF game itself, deduced from
 *  the kind of API events are received;
 * @example <caption>Application Game state</caption>
 * // ApiEvents.INITIALIZE_GAME -> GameState.STARTING_GAME
 * // ApiEvents.START_SORTIE    -> GameState.IN_SORTIE
 * @property {string} appState - the internal Dockyard application's state
 * @property {JSX.Element} webview - reference to the `<webview />` element that holds the game SWF
 * @property {Map<string, *>} lastScreenshot - The result of the last taken screenshot (during this session)
 * @property {boolean} isAudioMuted
 */

/**
 * @typedef {BaseRecord} ApiHandlerRecord
 */

/**
 * @typedef {BaseRecord} ApiActionRecord
 */

// Reducer state definitions
// -------------------------
/**
 * @typedef {Object|Map<string, *>} ApplicationReducerState
 */

/**
 * @typedef {Object|Map<string, *>} PlayerReducerState
 */

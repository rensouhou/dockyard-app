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

// API types
// ---------
/**
 * @typedef {IMap<string, *>} ApiActionResult
 */

// Player records
// --------------
/**
 * Base record type that all other records derive from.
 * @typedef {Object|Record.Class} BaseRecord
 */

/**
 * A record that holds the player's current state of usable materials.
 * @typedef {BaseRecord} MaterialStateRecord
 */

/**
 * @typedef {BaseRecord} FleetRecord
 * @property {number} flagship - ???
 * @property {number} id
 * @property {number} memberId
 * @property {List<number>} mission
 * @property {string} name
 * @property {List<ShipRecord>} ships
 * @since 0.2.0
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
 * @property {number} id - Quest ID
 * @property {number} type - Type of quest
 * @property {number} category - Category of quest; single, daily, weekly, monthly
 * @property {number} state
 * @property {string} title - Quest title
 * @property {string} detail - Description text
 * @property {MaterialStateRecord} reward - Rewards
 * @property {*} progress - Progress state of quest
 * @since 0.2.0
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
 * @property {string} appState - Internal Dockyard application's state
 * @property {JSX.Element} webview - Reference to the `<webview />` element that holds the game SWF
 * @property {Map<string, *>} lastScreenshot - Result of the last taken screenshot (during this session)
 * @property {boolean} isAudioMuted
 * @since 0.2.0
 */

/**
 * @typedef {BaseRecord} ApiHandlerRecord
 */

/**
 * @typedef {BaseRecord} ApiActionRecord
 * @property {?Object} body - Unprocessed GET body of the request
 * @property {?Object} postBody - Unprocessed POST body of the request
 * @property {string} path - Path of API request
 * @property {?Error} error - Error object for request
 * @since 0.2.0
 */

/**
 * @typedef {BaseRecord} PlayerProfileRecord
 */

/**
 * @typedef {BaseRecord} ProfileRecord
 */

// UI state definitions
// --------------------
/**
 * @typedef {Object} ApplicationUIState
 * @property {ApplicationUIStateProps} ui
 * @property {ApplicationUIActions} actions
 */

/**
 * @typedef {Object} ApplicationUIStateProps
 * @property {PlayerUIState} player
 * @property {IMap<string, *>} quest
 */

/**
 * @typedef {Object} ApplicationUIActions
 * @property {Object} application
 * @property {Object} transformers
 */

/**
 * @typedef {IMap<string, *>} PlayerUIState
 * @property {IList<FleetRecord>} fleets
 * @property {ProfileRecord} profile
 * @property {MaterialStateRecord} materials
 * @property {IList<ShipRecord>} ships
 * @property {IList<SlotItem>} slotItems
 */

/**
 * @typedef {IMap<string, *>} QuestUIState
 * @property {IList<QuestRecord>} quests
 */

// Reducer state definitions
// -------------------------
/**
 * @typedef {Object|Map<string, *>} BaseReducerState
 */

/**
 * @typedef {BaseReducerState} ApplicationReducerState
 */

/**
 * @typedef {BaseReducerState} PlayerReducerState
 * @deprecated
 */

/**
 * @typedef {BaseReducerState} OpponentReducerState
 * @property {ProfileRecord} profile
 * @property {FleetRecord} fleet
 */

/**
 * @typedef {BaseReducerState} QuestReducerState
 * @property {number} totalQuestCount
 * @property {number} currentPage
 * @property {number} totalPageCount
 * @property {number} currentActiveTab
 * @property {IList<QuestRecord>} questList
 */

// Misc. library definitions
// -------------------------
/**
 * @typedef {Immutable.Map} IMap
 */

/**
 * @typedef {Immutable.List} IList
 */

/**
 * @typedef {Immutable.Seq} ISeq
 */

/**
 * @typedef {Immutable.Iterable} IIterable
 */

// Other
// -----

/**
 * @typedef {Object} MissionReward
 * @property {number} id
 * @property {number} amount
 */

// Enums
// -----
/**
 * @typedef {Object} ApiEventEnum
 */

/**
 * @typedef {Object} ApiEventPathEnum
 */

/**
 * @typedef {Object} QuestStateEnum
 * @property {number} TURNED_IN - Not in API; used internally
 * @property {number} AVAILABLE
 * @property {number} IN_PROGRESS
 * @property {number} COMPLETED
 */


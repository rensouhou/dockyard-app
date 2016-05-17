/**
 * @overview
 *  Dockyard application state specification.
 *
 *  Use this as the single source of truth in everything related to
 *  the application state of the Dockyard app.
 *
 *  Every top-level interface can be found as a reducer with the
 *  same name in `/app/reducers`.
 *
 *  These definitions can also be used as JSDoc/ESDoc type signatures
 *  for functions and variables handling with these.
 */
export module DockyardState {
  // Base game data
  interface game {
    ships: Array<any>;
    shipTypes: Array<any>;
    slotItems: Array<any>;
    mapAreas: Array<any>;
    mapCells: Array<any>;
    missions: Array<any>;
  }

  // Application internals
  interface application {
    gameState: string;
    appState: string;
    webview: HTMLElement;
    lastScreenshot?: {
      successful: boolean;
      filename: string;
    };
  }

  // Player data
  interface player {
    profile: any;
    quests: any;
    fleets: any;
    ships: any;
    slotItems: any;
    docks: any;
    materials: any;

    /** @see {@link DockyardState.mission} */
    missions: void;
  }

  // Crafting-related
  interface crafting {
    flags?: {
      [key: string]: any;
    };
    consumed: {
      recipe: any;
    };
  }

  // Expeditions
  interface mission {}

  interface practice {
    opponents: Array<any>;
  }

  interface quest {
    quests: Array<any>;
  }

  interface result {
    reward: any;
    rank: any;
    rest: any;
  }

  interface ships {}
}

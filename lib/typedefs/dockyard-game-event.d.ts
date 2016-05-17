/**
 * @overview
 *
 * @since 0.1.0
 * @version 0.1.0
 */
export namespace Dockyard {
  module GameEvent {
    interface GameEventObject {
      body?: any;
      postBody?: any;
      path: string;
    }

    interface TransformedGameEvent {
      [key: string]: any;
    }

    export function transformer(eventData: GameEventObject): TransformedGameEvent;
  }
}

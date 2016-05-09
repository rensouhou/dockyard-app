/* eslint no-console: 0 */
/**
 * @overview
 *  Provides a thunk for adding notices and deprecation warnings to API action handlers.
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import invariant from 'invariant';
import warning from 'warning';

type ActionHandlerOptions = {
  warn?: bool,
  message?: string,
  verbose?: bool
};

export const createGameActionHandler = (...args) => {
  let event:string = null;
  let handlerFn:Function = null;
  let options:?ActionHandlerOptions = {};

  // If the event argument is a function, then use that function's `name` instead as identifier.
  // If the function supplied does not give a valid name, this will use `invariant` to throw.
  // This is a convenience function.
  if (typeof event === 'function') {
    [handlerFn, options] = args;
    event = handlerFn.name;
    options = { ...options };
    invariant(event, 'Supplied function did not expose a name. Check that you\'re not supplying' +
      'a non-assigned anonymous function. Alternatively, supply the name as the first argument with the' +
      'signature: `createGameActionWithHandler(event:string, handlerFn:function, ?options:Object)`\n\n' +
      '[YES => const fnWithName = (fn) => fn; createGameActionWithHandler(fnWithName)]\n' +
      '[NO  => createGameActionWithHandler((fn) => fn)]');
  }
  else {
    [event, handlerFn, options] = args;
  }

  const fullName:string = `${createGameActionHandler.name}.${event}`;

  if (options.warn) {
    warning(false, `[${fullName}] => warning ${!!options.message
      ? `: ${options.message}`
      : ''}`);
  }

  // @todo(@stuf): use a logger instead of raw `console.*` calls
  if (options.verbose) {
    console.info(`[${fullName}] called`);
  }

  return handlerFn;
};

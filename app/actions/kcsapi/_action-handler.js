/* eslint no-console: 0 */
/**
 * @overview
 *  Provides a thunk for adding notices and deprecation warnings to API action handlers.
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import warning from 'warning';

type ActionHandlerOptions = {
  warn?: bool,
  message?: string,
  verbose?: bool
};

export const gameActionHandler = (...args) => {
  let event:string = null;
  let handlerFn:Function = null;
  let options:?ActionHandlerOptions = {};

  // If the event argument is a function, then use that function's `name` instead as identifier.
  // This is a convenience function.
  if (typeof event === 'function') {
    [handlerFn, options] = args;
    event = handlerFn.name;
    options = { ...options };
  }
  else {
    [event, handlerFn, options] = args;
  }

  const fullName:string = `${gameActionHandler.name}.${event}`;

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


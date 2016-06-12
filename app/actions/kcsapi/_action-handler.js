/* eslint no-console: 0 */
/**
 * @overview
 *  Provides a thunk for adding notices and deprecation warnings to API action handlers.
 *
 * @since 0.1.0
 */
import invariant from 'invariant';

const defaultOpts = {
  verbose: true
};

export const createGameActionHandler = async(...args) => {
  let event = null;
  let handlerFn = null;
  let options = {};

  await setTimeout(() => {
    // console.log('delayed');

    // If the event argument is a function, then use that function's `name` instead as identifier.
    // If the function supplied does not give a valid name, this will use `invariant` to throw.
    // This is a convenience function.
    if (typeof args[0] === 'function') {
      handlerFn = args[0];
      options = args[1];
      event = handlerFn.name;
      options = { ...defaultOpts, ...options };
      invariant(event, 'Supplied function did not expose a name. Check that you\'re not supplying' +
        'a non-assigned anonymous function. Alternatively, supply the name as the first argument with the' +
        'signature: `createGameActionWithHandler(event:string, handlerFn:function, ?options:Object)`\n\n' +
        '[YES => const fnWithName = (fn) => fn; createGameActionWithHandler(fnWithName)]\n' +
        '[NO  => createGameActionWithHandler((fn) => fn)]');
    }
    else {
      [event, handlerFn, options] = args;
      options = { ...defaultOpts, ...options };
    }

    const fullName = `${createGameActionHandler.name}.${event}`;

    if (options && options.warn) {
      console.warn(false, `[${fullName}] => warning ${!!options.message
        ? `: ${options.message}`
        : ''}`);
    }

    console.info(`[${fullName}] handler prepared.`);
    return function handlerFuncWrapper(...handlerArgs) {
      if (options.verbose) {
        console.info(`[${fullName}] called;`, handlerArgs);
      }

      return handlerFn(...handlerArgs);
    };
  }, 420);
};

/**
 * @overview
 *
 * @since 0.1.0
 */
export const groupStartMiddleware = () => (next) => (action) => {
  console.group(`Action of type ${action.type}`);
  return next(action);
};

export const groupEndMiddleware = () => (next) => (action) => {
  console.groupEnd();
  return next(action);
};

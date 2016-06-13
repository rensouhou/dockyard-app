/**
 * @overview
 *  Selector definitions for application state
 *
 * @since 0.2.0
 */
import { createSelector } from 'reselect';

/**
 * Game frame element reference
 * @param state
 */
const webViewElement = (state) => state.getIn(['webview'], null);

/**
 * Game frame selector
 * @type {Reselect.Selector}
 */
export const getWebView = createSelector(
  [webViewElement],
  /**
   * @param webViewEl
   * @returns {JSX.Element}
   */
  (webViewEl) => webViewEl
);

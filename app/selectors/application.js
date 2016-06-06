/**
 * @overview
 *
 * @since 0.2.0
 */
import { createSelector } from 'reselect';

/**
 * @param state
 */
const webViewElement = (state) => state.getIn(['webview'], null);

export const getWebView = createSelector(
  [webViewElement],
  /**
   * @param webViewEl
   */
  (webViewEl) => webViewEl
);

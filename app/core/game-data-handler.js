/* eslint no-return-assign: 0, max-len: 0 */
/**
 * @overview
 *  Game data handler for {@see KCSApi} traffic
 *
 * @since 0.1.0
 * @version 0.4.0
 */
import qs from 'querystring';
import { Map } from 'immutable';
import invariant from 'invariant';
import { getObjectOrDefault } from '../transformers/primitive';
import { findEvent } from '../actions/api-actions';
import config from '../config';

let req = Map();

let firstGameLoad = true;
let gameUrl;
let debuggerAttached = false;

const Network = {
  REQUEST_WILL_BE_SENT: 'Network.requestWillBeSent',
  RESPONSE_RECEIVED: 'Network.responseReceived',
  LOADING_FINISHED: 'Network.loadingFinished'
};

export function createGameViewHandler(parseFunObj, cfg) {
  invariant(parseFunObj, 'A parsing function is required.');
  invariant(cfg, 'A configuration object is required.');
  return handleGameView(parseFunObj, cfg);
}

/**
 * @param parseFunObj
 * @param cfg
 * @returns {function}
 */
export function handleGameView(parseFunObj, cfg) {
  return (e) => {
    const view = e.target;
    /** @type {Electron.BrowserWindow.webContents} */
    const wc = view.getWebContents();
    /** @type {Electron.Session} */
    const ws = wc.session;

    invariant(view, 'A webview reference is required.');
    invariant(wc, 'A webcontents reference is required.');
    invariant(ws, 'A websession reference is required.');

    view.addEventListener('close', () => {
      wc.debugger.sendCommand('Network.disable');
    });

    if (!debuggerAttached) {
      try {
        wc.debugger.attach('1.1');
        debuggerAttached = true;
      }
      catch (err) {
        console.log('Debugger attach failed : ', err);
      }

      wc.debugger.on('detach', () => debuggerAttached = false);
      wc.debugger.on('message', new Handler(wc, parseFunObj, cfg));
      wc.debugger.sendCommand('Network.enable');

      // Redirect to the SWF itself when available.
      ws.webRequest.onBeforeRequest((details, callback) => {
        const cancel = config.gameSwfPrefix.test(details.url) && firstGameLoad;
        callback({ cancel });

        if (cancel) {
          console.log(`Found game SWF: ${details.url.replace(/\?.*$/, '')}`);
          gameUrl = details.url;
          firstGameLoad = false;
          wc.loadURL(gameUrl);
        }
      });

      // @todo Use `electron-cookies` instead.
      wc.executeJavaScript([
        'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";',
        'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";',
        'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";',
        'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";',
        'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";',
        'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";'
      ].join('\n'));
    }
  };
}

function parsePath(url, re) {
  return !!url ? url.replace(re, '') : null;
}

/**
 * Game data interceptor
 * @param {Object} wc
 * @param {Object} parseFunObj
 * @param {Object} cfg
 */
function Handler(wc, parseFunObj, cfg) {
  return (event, method, params) => {
    const { pathPrefix, apiDataPrefix } = cfg;
    const { requestId } = params;
    let url;

    try {
      switch (method) {
        case Network.REQUEST_WILL_BE_SENT:
          url = params.request.url;
          if (pathPrefix.test(url)) {
            req = req.update(requestId,
              it => ({
                ...it,
                request: params.request,
                path: parsePath(url, pathPrefix)
              }));
          }
          break;
        case Network.RESPONSE_RECEIVED:
          url = params.response.url;
          if (pathPrefix.test(url)) {
            req = req.update(requestId,
              it => ({ ...it, response: params.response }));
          }
          break;
        case Network.LOADING_FINISHED:
          if (req.has(requestId)) {
            const { path, request } = req.get(requestId);
            req = req.delete(requestId);
            wc.debugger.sendCommand('Network.getResponseBody', { requestId },
              (err, result) => {
                let body = {};
                let error;

                try {
                  body = JSON.parse(result.body.replace(apiDataPrefix, '')).api_data;
                }
                catch (e) {
                  console.error(e);
                  error = new SyntaxError(`Error parsing JSON; ${e.message}`);
                }

                // @todo Store API key for faster loading in the future?
                const postBody = qs.parse(request.postData);

                // Remove the API key from the object
                if (postBody.api_token != null) {
                  delete postBody.api_token;
                }

                const res = { path, error, body, postBody };

                // Look up the appropriate event name
                const eventToHandle = findEvent(res.path);
                const handler = getObjectOrDefault(parseFunObj.transformerActions)[eventToHandle];

                if (eventToHandle && handler) {
                  console.log(`${requestId}: Network.getResponseBody done = ${path}\t%o`,
                    JSON.parse(JSON.stringify({ ...res })));
                  handler(res);
                }
              });
          }
          break;
        default:
          // noop
          break;
      }
    }
    catch (e) {
      console.error('=>', e);
    }
  };
}

/* eslint no-return-assign: 0, no-console: 0, max-len: 0 */
/**
 * @overview
 *  Game data handler for {@see KCSApi} traffic
 *
 * @since 0.1.0
 * @author Stefan Rimaila
 * @module app/core/game-data-handler
 */
import qs from 'querystring';
import T from 'immutable';
import invariant from 'invariant';
import { ApiEventsByPath } from '../actions/game';
import config from '../config';

let req = T.Map();

let firstGameLoad = true;
let gameUrl;
let debuggerAttached = false;

const NETWORK = {
  RequestWillBeSent: 'Network.requestWillBeSent',
  ResponseReceived: 'Network.responseReceived',
  LoadingFinished: 'Network.loadingFinished'
};

export function createGameViewHandler(parseFunObj, cfg) {
  invariant(parseFunObj, 'A parsing function is required.');
  invariant(cfg, 'A configuration object is required.');

  // console.log('createGameViewHandler; parseFn =', parseFunObj);
  return handleGameView(parseFunObj, cfg);
}

/**
 * @param parseFunObj
 * @param cfg
 * @returns {function()}
 * @todo(@stuf): handle data as monads and rewrite individual handlers
 */
export function handleGameView(parseFunObj, cfg) {
  return (e) => {
    const view = e.target;
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
          console.log(`Found game SWF: ${details.url.replace(/\?.*$/, '?[API_KEY_REDACTED]')}`);
          gameUrl = details.url;
          firstGameLoad = false;
          wc.loadURL(gameUrl);
        }
      });

      // @todo(@stuf): use ws.cookies.set() instead
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
 * @todo(@stuf): add support to choose which action to dispatch instead of generic actions
 */
function Handler(wc, parseFunObj, cfg) {
  return (event, method, params) => {
    const { pathPrefix, apiDataPrefix } = cfg;
    const { requestId } = params;
    let url;

    try {
      switch (method) {
        case NETWORK.RequestWillBeSent:
          url = params.request.url;
          if (pathPrefix.test(url)) {
            req = req.update(requestId,
              (it) => Object.assign({}, it, {
                request: params.request,
                path: parsePath(url, pathPrefix)
              }));
          }
          break;
        case NETWORK.ResponseReceived:
          url = params.response.url;
          if (pathPrefix.test(url)) {
            req = req.update(requestId,
              (it) => Object.assign({}, it, { response: params.response }));
          }
          break;
        case NETWORK.LoadingFinished:
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
                const eventToHandle = ApiEventsByPath.find((v, k) => res.path.includes(k));
                const handler = (parseFunObj.transformerActions || {})[eventToHandle];

                if (eventToHandle && handler) {
                  console.log(`found a handler (\`${handler.name}\`) for the event ${eventToHandle} with data:`, { ...res });
                  handler(res);
                }

                // console.log(`${requestId}: Network.getResponseBody done = ${path}\t%O`, JSON.parse(JSON.stringify({ res })));
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

/* eslint arrow-body-style: 0 */
/**
 * @overview
 *
 * @since 0.2.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/actions/interface
 */
import { createAction } from 'redux-actions';

export const CAPTURE_SCREEN = 'CAPTURE_SCREEN';

export const captureScreen = createAction(CAPTURE_SCREEN, (gameView) => {
  const browserWindow = require('electron').remote.getCurrentWindow();
  const gameViewRect = gameView.getBoundingClientRect();

  browserWindow.capturePage({
    x: gameViewRect.left,
    y: gameViewRect.top,
    width: gameViewRect.width,
    height: gameViewRect.height
  }, (image) => {
    const fs = require('fs');
    const filename = `/Users/stuf/electron_${+(new Date())}.png`;
    fs.writeFile(filename, image.toPng(), () => {
      console.log(`Screenshot saved as: ${filename}`);
    });
  });
});

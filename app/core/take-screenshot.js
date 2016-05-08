/**
 * @overview
 *
 * @since 0.2.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/core/take-screenshot
 * @flow
 * @deprecated
 */
const browserWindow = require('electron').remote.getCurrentWindow();

export function takeScreenshot(event:Event):boolean {
  console.error('Deprecated use, fix reference to gameView');

  event.preventDefault();
  const gameView:HTMLElement = document.getElementById('game');
  const gameViewRect:ClientRect = gameView.getBoundingClientRect();
  let wasSuccessful:boolean = false;

  browserWindow.capturePage({
    x: gameViewRect.left,
    y: gameViewRect.top,
    width: gameViewRect.width,
    height: gameViewRect.height
  }, (image) => {
    const fs = require('fs');
    const filename:string = `/Users/stuf/electron_${+(new Date())}.png`;
    fs.writeFile(filename, image.toPng(), () => {
      console.log(`Screenshot saved as: ${filename}`);
      wasSuccessful = true;
    });
  });

  return wasSuccessful;
}

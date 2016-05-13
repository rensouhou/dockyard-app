/* eslint no-console: 0, prefer-template: 0, prefer-const: 0, no-param-reassign: 0 */
import { app, BrowserWindow, Menu, crashReporter, shell } from 'electron';
import winston from 'winston';
import chalk from 'chalk';
import bluebird from 'bluebird';
import electronStorage from 'electron-json-storage';

bluebird.promisifyAll(electronStorage);

process.removeAllListeners('uncaughtException');
process.on('uncaughtException', err => {
  console.log(chalk.red.inverse.bold('Uncaught exception:'));
  console.log(chalk.red(err.stack || err));
});

//
// Initialize logging
//
winston.setLevels({
  normal: 0,
  success: 1,
  failed: 2,
  info: 3,
  warn: 4,
  error: 5,
  fatal: 6,
  uncaught: 7
});

const chalkPID = chalk.bgBlue;
const chalkSuccess = chalk.green;
const chalkWarn = chalk.yellow;
const chalkError = chalk.red;
const chalkInfo = chalk.cyan;

const levelToFormat = {
  normal(text) {
    let pid = chalkPID(`[${process.pid}]`) + ' ';
    return pid + text;
  },
  success(text) {
    let pid = chalkPID(`[${process.pid}]`) + ' ';
    return pid + chalkSuccess(text);
  },
  failed(text) {
    let pid = chalkPID(`[${process.pid}]`) + ' ';
    return pid + chalkError(text);
  },
  info(text) {
    let pid = chalkPID(`[${process.pid}]`) + ' ';
    return pid + chalkInfo(text);
  },
  warn(text) {
    let pid = chalkPID(`[${process.pid}]`) + ' ';
    return pid + chalkWarn.inverse.bold('Warning:') + ' ' + chalkWarn(text);
  },
  error(text) {
    let pid = chalkPID(`[${process.pid}]`) + ' ';
    return pid + chalkError.inverse.bold('Error:') + ' ' + chalkError(text);
  },
  fatal(text) {
    let pid = chalkPID(`[${process.pid}]`) + ' ';
    return pid + chalkError.inverse.bold('Fatal Error:') + ' ' + chalkError(text);
  },
  uncaught(text) {
    let pid = chalkPID(`[${process.pid}]`) + ' ';
    return pid + chalkError.inverse.bold('Uncaught Exception:') + ' ' + chalkError(text);
  },
};

//
// Start application
// -----------------
crashReporter.start();

let menu;
let template;
let mainWindow = null;

// @todo(@stuf): Currently OSX only. Pls fix.
app.commandLine.appendSwitch('remote-debugging-port', 8642);
app.commandLine.appendSwitch('ppapi-flash-path', './lib/PepperFlashPlayer.plugin');
app.commandLine.appendSwitch('ppapi-flash-version', '21.0.0.197');
console.log('configuration set');

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  console.log(chalkInfo('All windows have been closed.'));
  if (process.platform !== 'darwin') app.quit();
});

app.on('gpu-process-crashed', () => {
  console.log(chalk.red.inverse.bold('GPU process crashed!'));
});

app.on('ready', () => {
  console.log(chalkSuccess('Application ready.'));
  winston.cli();

  // Remove the default transports
  winston.remove(winston.transports.Console);

  // ...and add the new and shiny one
  winston.add(winston.transports.Console, {
    level: 'normal',
    formatter(options) {
      let text = '';
      if (!!options.message) {
        text += options.message;
      }
      if (options.meta && Object.keys(options.meta).length) {
        text += ' ' + JSON.stringify(options.meta);
      }
      let formatter = levelToFormat[options.level];
      if (formatter) {
        return formatter(text);
      }

      return text;
    }
  });

  winston.log('normal', 'herpy derp');

  mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 1100
  });

  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    // mainWindow.openDevTools();
  }

  if (process.platform === 'darwin') {
    template = [
      {
        label: 'Dockyard',
        submenu: [
          {
            label: 'About Dockyard',
            selector: 'orderFrontStandardAboutPanel:'
          }, {
            type: 'separator'
          }, {
            label: 'Services',
            submenu: []
          }, {
            type: 'separator'
          }, {
            label: 'Hide Dockyard',
            accelerator: 'Command+H',
            selector: 'hide:'
          }, {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
          }, {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          }, {
            type: 'separator'
          }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() {
              app.quit();
            }
          }
        ]
      }, {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
          }, {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          }, {
            type: 'separator'
          }, {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          }, {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          }, {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          }, {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          }
        ]
      }, {
        label: 'View',
        submenu: (process.env.NODE_ENV === 'development') ? [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click() {
              mainWindow.restart();
            }
          }, {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }, {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click() {
              mainWindow.toggleDevTools();
            }
          }
        ] : [
          {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }
        ]
      }, {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          }, {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          }, {
            type: 'separator'
          }, {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }
        ]
      }, {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('http://electron.atom.io');
            }
          }, {
            label: 'Documentation',
            click() {
              shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
            }
          }, {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://discuss.atom.io/c/electron');
            }
          }, {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/atom/electron/issues');
            }
          }
        ]
      }
    ];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
  else {
    template = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open',
            accelerator: 'Ctrl+O'
          }, {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click() {
              mainWindow.close();
            }
          }
        ]
      }, {
        label: '&View',
        submenu: (process.env.NODE_ENV === 'development') ? [
          {
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click() {
              mainWindow.restart();
            }
          }, {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }, {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click() {
              mainWindow.toggleDevTools();
            }
          }
        ] : [
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }
        ]
      }, {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('http://electron.atom.io');
            }
          }, {
            label: 'Documentation',
            click() {
              shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
            }
          }, {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://discuss.atom.io/c/electron');
            }
          }, {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/atom/electron/issues');
            }
          }
        ]
      }
    ];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});

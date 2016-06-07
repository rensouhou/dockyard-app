/* eslint no-console: 0, prefer-template: 0, prefer-const: 0, no-param-reassign: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import { app, BrowserWindow, Menu, shell } from 'electron';
import chalk from 'chalk';
import './src/main/timers';
import { createGameDataLogger } from './src/main/game-data-logger';

process.removeAllListeners('uncaughtException');
process.on('uncaughtException', err => {
  console.log(chalk.red.inverse.bold('Uncaught exception:'));
  console.log(chalk.red(err.stack || err));
});

let menu;
let template;
let mainWindow = null;

// @todo(@stuf): Currently OSX only. Pls fix.
app.commandLine.appendSwitch('remote-debugging-port', '8642');
app.commandLine.appendSwitch('ppapi-flash-path', './lib/PepperFlashPlayer.plugin');
app.commandLine.appendSwitch('ppapi-flash-version', '21.0.0.197');
console.log(chalk.green.bold('Configuration set.'));

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

// Other "secondary" functions
createGameDataLogger();

app.on('window-all-closed', () => {
  console.log('All windows have been closed.');
  if (process.platform !== 'darwin') app.quit();
});

app.on('gpu-process-crashed', () => {
  console.log(chalk.red.inverse.bold('GPU process crashed!'));
});

app.on('ready', () => {
  console.log(chalk.green.bold('Application ready.'));

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
      },
      {
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
      },
      {
        label: 'View',
        submenu: (process.env.NODE_ENV) ? [
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

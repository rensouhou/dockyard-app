/**
 * @overview
 *
 * @since 0.1.0
 */
import { Menu, shell } from 'remote';
import { List, Record } from 'immutable';

const createDarwinMenu = (store) => {
  let menuTemplate = List();

  menuTemplate = menuTemplate.push([
    {
      label: 'Dockyard',
      submenu: []
    },
    {
      label: 'Edit',
      submenu: []
    },
    {
      label: 'View',
      submenu: []
    },
    {
      label: 'Window',
      submenu: []
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          click: shell.openExternal('https://github.com/rensouhou/dockyard-app/tree/master/docs#readme')
        }
      ]
    }
  ]);

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

export default function createMainWindowMenu(store) {
  let menu = null;
  if (process.platform === 'darwin') {
    menu = createDarwinMenu(store);
  }
  else {
    menu = createDarwinMenu(store);
  }

  console.info('Created main window menu ->', menu);
}

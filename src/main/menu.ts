import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
  dialog,
} from 'electron';
import path from 'path';
import https from 'https';
import semverCompare from 'semver-compare';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: 'Electron',
      submenu: [
        {
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://electronjs.org');
          },
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(
              'https://github.com/electron/electron/tree/main/docs#readme'
            );
          },
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://www.electronjs.org/community');
          },
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/electron/electron/issues');
          },
        },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open File...',
            accelerator: 'Ctrl+O',
            click: () => this.mainWindow.webContents.send('menu-open-file'),
          },
          {
            label: 'Preferences',
            submenu: [
              {
                label: 'Toggle light/dark mode',
                click: () =>
                  this.mainWindow.webContents.send('menu-toggle-dark-mode'),
              },
            ],
          },
          {
            type: 'separator',
          },
          {
            label: '&Exit',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Check for Updates...',
            click: () => {
              // Extract latest version from the package.json in the main github branch
              https
                .get(
                  'https://raw.githubusercontent.com/Bryght7/videoSJ/main/package.json',
                  (res) => {
                    let body = '';

                    res.on('data', (chunk) => {
                      body += chunk;
                    });

                    res.on('end', () => {
                      try {
                        const remotePackageJson = JSON.parse(body);
                        const latestVersion = remotePackageJson.version;
                        const currentVersion =
                          process.env.npm_package_version || app.getVersion();
                        switch (semverCompare(latestVersion, currentVersion)) {
                          case 1: {
                            // latest > current
                            const choiceId = dialog.showMessageBoxSync(
                              this.mainWindow,
                              {
                                type: 'question',
                                message: 'New update is available.',
                                detail:
                                  'Download the latest version of VideoSJ.',
                                buttons: ['Open the releases page', 'Cancel'],
                                defaultId: 0,
                              }
                            );
                            if (choiceId === 0) {
                              shell.openExternal(
                                'https://github.com/Bryght7/videoSJ/releases'
                              );
                            }
                            break;
                          }
                          case 0: // latest = current
                            dialog.showMessageBoxSync(this.mainWindow, {
                              type: 'info',
                              title: 'VideoSJ',
                              message:
                                'There are currently no updates available.',
                            });
                            break;
                          default:
                        }
                      } catch (error) {
                        dialog.showErrorBox(
                          'VideoSJ',
                          'Failed to read the latest version number.'
                        );
                      }
                    });
                  }
                )
                .on('error', () => {
                  dialog.showErrorBox(
                    'VideoSJ',
                    'Failed to request the latest version number.'
                  );
                });
            },
          },
          {
            type: 'separator',
          },
          {
            label: 'Donate',
            click() {
              shell.openExternal('https://www.buymeacoffee.com/Bryght7');
            },
          },
          {
            label: 'About',
            click: () => {
              const RESOURCES_PATH = app.isPackaged
                ? path.join(process.resourcesPath, 'assets')
                : path.join(__dirname, '../../assets');

              /**
               * 👀 Note: to copy the files to the build package, I edited the file
               * `.erb\configs\webpack.config.main.prod.ts` with a CopyPlugin plugin
               */
              const FILE_PATH = app.isPackaged
                ? 'dist/main/templates/about.html'
                : 'templates/about.html';

              const aboutWindow = new BrowserWindow({
                parent: this.mainWindow,
                modal: true,
                width: 315,
                height: 520,
                show: false,
                resizable: false,
                fullscreenable: false,
                minimizable: false,
                maximizable: false,
                icon: path.join(RESOURCES_PATH, 'icon.ico'),
              });
              aboutWindow.setMenuBarVisibility(false);

              // Using query option to send data to be used in the html file
              aboutWindow.loadFile(FILE_PATH, {
                query: {
                  icon: path.join(RESOURCES_PATH, 'icon.ico'),
                  appVersion:
                    process.env.npm_package_version ||
                    app.getVersion() ||
                    'Unknown',
                  processVersions: JSON.stringify(process.versions),
                  license: 'GNU GPL v3.0',
                },
              });
              aboutWindow.once('ready-to-show', () => {
                aboutWindow.show();
              });
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}

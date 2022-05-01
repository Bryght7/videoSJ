/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import pathToFfmpeg from 'ffmpeg-static';
// @ts-ignore
import shellEscape from 'any-shell-escape';
import util from 'util';
import { app, BrowserWindow, dialog, ipcMain, protocol, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import Part from 'renderer/Part.type';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

/**
 * ICP stuff (🔎 for other ICP references)
 * Typings for our custom ICP api
 */
declare global {
  interface Window {
    api: {
      // Renderer to main
      openFileDialog: () => Promise<string | null>;
      saveFileDialog: () => Promise<string | null | undefined>;
      createInputFile: (
        videoUrl: string,
        parts: Part[]
      ) => Promise<string | null>;
      splitJoin: (outputFilePath: string) => Promise<boolean>;
      openOutputDir: (outputFilePath: string) => void;

      // Main to renderer
      menuOpenFile: (callback: () => void) => void;
      menuToggleDarkMode: (callback: () => void) => void;
    };
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 535,
    resizable: false,
    icon: getAssetPath('icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * ICP stuff (🔎 for other ICP references)
 * Handler functions
 */

const handleOpenFile = async () => {
  if (mainWindow) {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      // Accepted types (🔎 for other references)
      filters: [{ name: 'Movies', extensions: ['mp4', 'm4v', 'avi', 'mkv'] }],
    });

    return canceled ? null : filePaths[0];
  }
  return null;
};

const handleSaveFile = async () => {
  if (mainWindow) {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      // Accepted types (🔎 for other references)
      filters: [{ name: 'Movies', extensions: ['mp4', 'm4v', 'avi', 'mkv'] }],
    });
    return canceled ? null : filePath;
  }
  return null;
};

const handleCreateInputFile = async (videoUrl: string, parts: Part[]) => {
  const dirPath = path.join(app.getPath('appData'), 'VideoSJ');

  let content = '';
  parts.forEach((p) => {
    content += `file '${videoUrl.replace('vsj://', '')}'\ninpoint ${
      p.startTime
    }\noutpoint ${p.endTime}\n`;
  });

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const inputFilePath = path.join(dirPath, 'input.txt');
  try {
    await fsPromises.writeFile(inputFilePath, content, { flag: 'w' });
  } catch (err) {
    console.error(err);
    return null;
  }
  return inputFilePath;
};

const handleSplitJoin = async (outputFilePath: string) => {
  const inputFilePath = path.join(
    app.getPath('appData'),
    'VideoSJ',
    'input.txt'
  );
  const task = shellEscape([
    pathToFfmpeg,
    '-y',
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    inputFilePath,
    '-c',
    'copy',
    outputFilePath,
  ]);
  const exec = util.promisify(require('child_process').exec);
  try {
    await exec(task);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

const handleOpenOutputDir = (outputFilePath: string) => {
  shell.showItemInFolder(outputFilePath);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();

    /**
     * ICP stuff (🔎 for other ICP references)
     * Handlers for invokeable IPCs
     */
    ipcMain.handle('open-file-dialog', handleOpenFile);
    ipcMain.handle('save-file-dialog', handleSaveFile);
    ipcMain.handle('create-input-file', (event, videoUrl, parts) =>
      handleCreateInputFile(videoUrl, parts)
    );
    ipcMain.handle('split-join', (event, outputFilePath) =>
      handleSplitJoin(outputFilePath)
    );
    ipcMain.handle('open-output-dir', (event, outputFilePath) =>
      handleOpenOutputDir(outputFilePath)
    );

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

// Custom protocol called `vsg://` to allow Electron to open local files (security)
app.on('ready', async () => {
  protocol.registerFileProtocol('vsj', (request, callback) => {
    const url = request.url.replace('vsj://', '');
    try {
      return callback(url);
    } catch (error) {
      console.error(error);
      return callback('404');
    }
  });
});

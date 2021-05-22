import { app, BrowserWindow, screen, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { Message } from "primeng/api";

import { ConfigService } from './config.service';
import { FolderService } from './folder.service';
import { ModsService } from './mods.service';
import { hasAdminPrivileges } from './utils';
import { AppState } from './app-state';
import { CoreService } from './core.service';

const appState = new AppState(ipcMain);

process.on("uncaughtException", (err: Error) => {
  dialog.showErrorBox(err.name, err.message);
  process.exit(-1);
});

process.on("unhandledRejection", (err: any) => {
  dialog.showErrorBox("Error", err.toString());
  process.exit(-1);
})

hasAdminPrivileges().then(isAdmin => {
  if (!isAdmin) {
    throw new Error("Application must be run with administrator privileges.");
  }
});

// Initialize remote module
require('@electron/remote/main').initialize();

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

let modsService: ModsService;

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  const targetWidth: number = 1000;
  const targetHeight: number = 600;

  // Create the browser window.
  win = new BrowserWindow({
    x: (size.width - targetWidth) / 2,
    y: (size.height - targetHeight) / 2,
    width: targetWidth,
    height: targetHeight,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule : true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  if (serve) {

    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.removeMenu();
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../../dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  win.webContents.on("did-navigate", () => {
    if (modsService) {
      modsService.win = win;
    }

    const msg: Message = { severity: "info", summary: "Ready to go", detail: "Manager is ready" };
    win.webContents.send("notification", msg);
  });

  appState.window = win;

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

  const folderService: FolderService = new FolderService();

  const coreService = new CoreService(appState);
  coreService.setup();

  const configService = new ConfigService(appState, folderService);
  configService.setup();

  // start communication protocol between main & renderer
  modsService = new ModsService(appState);
  modsService.setup();
} catch (e) {
  // Catch Error
  throw e;
}

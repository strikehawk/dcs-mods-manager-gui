import { BrowserWindow, IpcMain } from "electron";
import { Configuration } from "./model";

export class AppState {
  public window: BrowserWindow;
  public readonly ipcMain: IpcMain

  public config: Configuration;

  constructor(ipcMain: IpcMain) {
    this.ipcMain = ipcMain;
  }
}

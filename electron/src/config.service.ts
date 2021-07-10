import { app, remote } from "electron";
import * as path from "path";
import * as fs from "fs-extra";

import { FolderService } from "./folder.service";
import { ConfigFile, Configuration } from "./model";
import { BaseService } from "./base.service";
import { GET_CONFIGURATION, IS_DCS_USER_FOLDER_VALID, IS_MODS_FOLDER_VALID, SET_CONFIGURATION } from "./channels";
import { AppState } from "./app-state";

export class ConfigService extends BaseService {
  private _defaults: ConfigFile = {
    dcsUserFolder: "",
    modsFolder: ""
  };

  constructor(
    appState: AppState,
    private folderService: FolderService
  ) {
    super(appState);
    this._defaults.dcsUserFolder = folderService.getCandidateDcsFolderPath();
  }
  public setup(): void {
    this._setupMessage(GET_CONFIGURATION, this.getConfig.bind(this));
    this._setupMessage(SET_CONFIGURATION, this._setConfig.bind(this));

    this._setupMessage(IS_DCS_USER_FOLDER_VALID, this.folderService.isDcsUserFolderValid.bind(this));
    this._setupMessage(IS_MODS_FOLDER_VALID, this.folderService.isModsFolderValid.bind(this));

    this.appState.config = this.getConfig();
  }

  public getConfig(): Configuration {
    const configFile = this._readFileContent();
    const config = this._getConfig(configFile);
    this._checkConfig(config);

    return config;
  }

  private _getConfig(configFile: ConfigFile): Configuration {
    const dcsUserFolder = configFile.dcsUserFolder;
    const modsFolder = configFile.modsFolder;

    const config: Configuration = Object.assign({
      dcsAircraftFolder: dcsUserFolder ? this.folderService.getDcsAircraftFolder(configFile.dcsUserFolder) : "",
      dcsLiveriesFolder: dcsUserFolder ? this.folderService.getDcsLiveriesFolder(configFile.dcsUserFolder) : "",
      dcsTechFolder: dcsUserFolder ? this.folderService.getDcsTechFolder(configFile.dcsUserFolder) : "",
      dcsAircraftKneeboardsFolder: dcsUserFolder ? this.folderService.getModsAircraftKneeboardsFolder(configFile.dcsUserFolder) : "",
      modsAircraftFolder: modsFolder ? this.folderService.getModsAircraftFolder(configFile.modsFolder) : "",
      modsLiveriesFolder: modsFolder ? this.folderService.getModsLiveriesFolder(configFile.modsFolder) : "",
      modsTechFolder: modsFolder ? this.folderService.getModsTechFolder(configFile.modsFolder) : "",
      modsAircraftKneeboardsFolder: modsFolder ? this.folderService.getModsAircraftKneeboardsFolder(configFile.modsFolder) : "",
    }, configFile);

    return config;
  }

  private _getConfigFilePath(): string {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (app || remote.app).getPath("userData");

    return path.join(userDataPath, "config.json");
  }

  private _readFileContent(): ConfigFile {
    const filePath = this._getConfigFilePath();

    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
      return this._defaults;
    }
  }

  private async _setConfig(configFile: ConfigFile): Promise<void> {
    const filePath = this._getConfigFilePath();

    try {
      // write the config file
      fs.writeJsonSync(filePath, configFile);

      const config = this._getConfig(configFile);
      this._checkConfig(config);

      this.appState.config = config;
    } catch (error) {
      console.error(error);
    }
  }

  private _checkConfig(config: Configuration): void {
    if (!config.dcsUserFolder) {
      config.dcsUserFolderError = "DCS user folder cannot be empty.";
    } else {
      try {
        this.folderService.checkDcsUserFolderStructure(config.dcsUserFolder);
      } catch (e) {
        const err = e as Error;
        config.dcsUserFolderError = err.message;
      }
    }

    if (!config.modsFolder) {
      config.modsFolderError = "Mods folder cannot be empty.";
    } else {
      try {
        this.folderService.checkModsFolderStructure(config.modsFolder);
      } catch (e) {
        const err = e as Error;
        config.modsFolderError = err.message;
      }
    }
  }
}

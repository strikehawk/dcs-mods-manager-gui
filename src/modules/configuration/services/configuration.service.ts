import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { GET_CONFIGURATION, IS_DCS_USER_FOLDER_VALID, IS_MODS_FOLDER_VALID, PICK_FOLDER, SET_CONFIGURATION } from '../../../../electron/src/channels';
import { ConfigFile, Configuration } from '../../../../electron/src/model';
import { ElectronService } from '../../core/services/electron.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
    private electronService: ElectronService
  ) { }

  public async pickFolder(title?: string, defaultFolder?: string): Promise<string> {
    return this.electronService.getData(PICK_FOLDER, title, defaultFolder);
  }

  public async getConfiguration(): Promise<Configuration> {
    if (!this.electronService.isElectron) {
      return Promise.resolve({
        dcsUserFolder: "",
        dcsAircraftFolder: "",
        dcsLiveriesFolder: "",
        modsFolder: "",
        modsAircraftFolder: "",
        modsLiveriesFolder: ""
      });
    }

    return this.electronService.getData(GET_CONFIGURATION);
  }

  public async saveConfiguration(config: ConfigFile): Promise<void> {
    return this.electronService.getData(SET_CONFIGURATION, config);
  }

  public async isDcsUserFolderValid(folder: string): Promise<ValidationErrors | null> {
    return this.electronService.getData(IS_DCS_USER_FOLDER_VALID, folder);
  }

  public async isModsFolderValid(folder: string): Promise<ValidationErrors | null> {
    return this.electronService.getData(IS_MODS_FOLDER_VALID, folder);
  }
}

import { dialog, OpenDialogOptions } from "electron";

import { BaseService } from "./base.service";
import { PICK_FOLDER } from "./channels";
import { AppState } from "./app-state";

export class CoreService extends BaseService {
  constructor(
    appState: AppState
  ) {
    super(appState);
  }

  public setup(): void {
    this._setupMessage(PICK_FOLDER, this._pickFolder.bind(this));
  }

  private async _pickFolder(title?: string, defaultFolder?: string): Promise<string> {
    if (!this.appState.window) {
      return null;
    }

    const options: OpenDialogOptions = { properties: ["openDirectory"] };
    if (title) {
      options.title = title;
    }

    if (defaultFolder) {
      options.defaultPath = defaultFolder;
    }

    const result = await dialog.showOpenDialog(this.appState.window, options);
    return result.filePaths.length > 0 ? result.filePaths[0] : null;
  }
}

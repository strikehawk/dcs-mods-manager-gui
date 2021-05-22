import { IpcRendererEvent } from "electron/main";
import { ElectronService } from "./electron.service";

export class ChannelWrapper<T> {
  private _resultCb: (ev: IpcRendererEvent, result: T) => void;
  private _errorCb: (ev: IpcRendererEvent, err: Error) => void;

  private _replyName: string;
  private _errorName: string;

  constructor(
    private electronService: ElectronService,
    private messageName: string
  ) {
    if (!messageName) {
      throw new Error("Message name cannot be empty.");
    }

    this._replyName = messageName + "Reply";
    this._errorName = messageName + "Error";
  }

  public send(...args: any[]): Promise<T> {
    return new Promise((resolve: (value: T) => void, reject) => {
      this._errorCb = (ev, error) => {
        this._dispose();
        reject(error.message);
      };
      this._resultCb = (ev, res) => {
        this._dispose();
        resolve(res);
      };

      try {
        this.electronService.ipcRenderer.once(this._errorName, this._errorCb);
        this.electronService.ipcRenderer.once(this._replyName, this._resultCb);

        this.electronService.ipcRenderer.send(this.messageName, ...args);
      } catch (error) {
        this._dispose();
        throw error;
      }
    });
  }

  private _dispose(): void {
    if (this._errorCb) {
      this.electronService.ipcRenderer.off(this._errorName, this._errorCb);
      this._errorCb = null;
    }

    if (this._resultCb) {
      this.electronService.ipcRenderer.off(this._replyName, this._resultCb);
      this._resultCb = null;
    }
  }
}

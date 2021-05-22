import { AppState } from "./app-state";

export abstract class BaseService {
  constructor(
    protected appState: AppState
  ) { }

  protected _setupMessage<T>(messageName: string, callback: (...args: any[]) => Promise<T>): void {
    const replyName = messageName + "Reply";
    const errorName = messageName + "Error";

    this.appState.ipcMain.on(messageName, async (ev, args) => {
      try {
        let result: T;
        if (args.length > 1) {
          result = await callback(...args);
        } else if (args.length === 1) {
          result = await callback(args[0]);
        } else {
          result = await callback();
        }

        ev.reply(replyName, result);
      } catch (error) {
        ev.reply(errorName, error);
      }
    });
  }
}

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { MessageService, Message } from "primeng/api";

import { ElectronService } from '../../../modules/core/services/electron.service';
import { AppConfig } from '../../../environments/environment';
import { IpcRendererEvent } from 'electron/main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private messageService: MessageService
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);

      this._listenErrorMessages();
    } else {
      console.log('Run in browser');
    }
  }

  private _listenErrorMessages(): void {
    this.electronService.ipcRenderer.on("notification", (ev: IpcRendererEvent, msg: Message) => {
      this.messageService.add(msg);
    });
  }
}

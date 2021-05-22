import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ConfigFile, Configuration } from '../../../../../electron/src/model';
import { ConfigurationService } from '../../services/configuration.service';
import { DcsUserFolderValidator } from '../../validators/dcs-user-folder.validator';
import { ModsFolderValidator } from '../../validators/mods-folder.validator';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  public configurationForm: FormGroup;

  private _config: Configuration;

  private _valueChangeSub: Subscription;

  public dcsUserFolderErrors: any;
  public modsFolderErrors: any;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private dcsUserFolderValidator: DcsUserFolderValidator,
    private modsFolderValidator: ModsFolderValidator
  ) {
    this._setupForm();
  }

  public async ngOnInit(): Promise<void> {
    this._config = await this.configService.getConfiguration();
    this._processConfig();
  }

  public ngOnDestroy(): void {
    if (this._valueChangeSub) {
      this._valueChangeSub.unsubscribe();
      this._valueChangeSub = null;
    }
  }

  public async submit(): Promise<void> {
    const config: ConfigFile = {
      dcsUserFolder: this.configurationForm.controls.dcsUserFolder.value,
      modsFolder: this.configurationForm.controls.modsFolder.value
    };

    this.configService.saveConfiguration(config);

    this._config = await this.configService.getConfiguration();
    this._processConfig();
  }

  public async pickFolder(): Promise<string> {
    const folder = await this.configService.pickFolder();
    console.log(folder);

    return folder;
  }

  private _processConfig(): void {
    setTimeout(() => {
      this.configurationForm.setValue({
        dcsUserFolder: this._config.dcsUserFolder,
        modsFolder: this._config.modsFolder
      });
      this.configurationForm.updateValueAndValidity();
    });
  }

  private _setupForm(): void {
    this.configurationForm = this.fb.group({
      dcsUserFolder: this.fb.control("", null, [this.dcsUserFolderValidator.getAsyncValidatorFn()]),
      modsFolder: this.fb.control("", null, [this.modsFolderValidator.getAsyncValidatorFn()])
    });
  }
}

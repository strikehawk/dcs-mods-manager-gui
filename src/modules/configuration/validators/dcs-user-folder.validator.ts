import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

import { ConfigurationService } from "../services/configuration.service";

@Injectable({ providedIn: 'root' })
export class DcsUserFolderValidator implements AsyncValidator {
  constructor(
    private configurationService: ConfigurationService
  ) { }

  public validate(ctrl: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    return this.configurationService.isDcsUserFolderValid(ctrl.value);
  }

  public getAsyncValidatorFn(): AsyncValidatorFn {
    return this.validate.bind(this);
  }
}

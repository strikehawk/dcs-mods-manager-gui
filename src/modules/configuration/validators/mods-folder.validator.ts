import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

import { ConfigurationService } from "../services/configuration.service";

@Injectable({ providedIn: 'root' })
export class ModsFolderValidator implements AsyncValidator {
  constructor(
    private configurationService: ConfigurationService
  ) { }

  public validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.configurationService.isModsFolderValid(ctrl.value);
  }

  public getAsyncValidatorFn(): AsyncValidatorFn {
    return this.validate.bind(this);
  }
}

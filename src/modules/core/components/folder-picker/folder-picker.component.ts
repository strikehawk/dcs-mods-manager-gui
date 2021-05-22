import { Component, Input, OnInit, forwardRef, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { PICK_FOLDER } from '../../../../../electron/src/channels';

import { ElectronService } from '../../services/electron.service';

@Component({
  selector: 'app-folder-picker',
  templateUrl: './folder-picker.component.html',
  styleUrls: ['./folder-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FolderPickerComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderPickerComponent implements OnInit, ControlValueAccessor {
  @Input()
  public label: string;

  @Input()
  public formControl: FormControl;

  private _errors: ValidationErrors;

  @Input()
  public get errors(): ValidationErrors {
    return this._errors;
  }

  public set errors(value: ValidationErrors) {
    this._errors = value;
    this.cdr.detectChanges();
  }

  public get hasErrors(): boolean {
    return this._errors && Object.keys(this._errors).length > 0
  }

  public disabled: boolean;

  private _folder: string = "";

  public get value(): string {
    return this._folder;
  }

  public onChange = (folder: string) => { };
  public onTouch = () => { };

  constructor(
    private cdr: ChangeDetectorRef,
    private electronService: ElectronService
  ) { }

  ngOnInit(): void {
  }

  @HostListener('blur')
  public onTouched(): void {
    this.onTouch();
  }

  @HostListener('input', ['$event.target.value'])
  public onInput(value: string): void {
    this._folder = value;
    this.onChange(value);
    this.cdr.detectChanges();
  }

  // Allows Angular to update the model.
  // Update the model and changes needed for the view here.
  public writeValue(folder: string): void {
    this._folder = folder;
    this.cdr.detectChanges();
    this.onChange(this.value);
  }

  // Allows Angular to register a function to call when the model changes.
  // Save the function as a property to call later here.
  public registerOnChange(fn: (folder: string) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  // Allows Angular to disable the input.
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }

  public async pickFolder(): Promise<void> {
    const folder = await this.electronService.getData<string>(PICK_FOLDER, this.label, this.value);
    if (!folder) {
      return;
    }

    this._folder = folder;
    this.cdr.detectChanges();
    this.onChange(folder);
  }
}

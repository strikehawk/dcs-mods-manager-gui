import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { FolderPickerComponent } from './components/folder-picker/folder-picker.component';

@NgModule({
  declarations: [
    FolderPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FlexLayoutModule
  ],
  exports: [
    FolderPickerComponent
  ]
})
export class CoreModule { }

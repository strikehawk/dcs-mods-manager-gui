import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { AircraftsComponent } from './components/aircrafts/aircrafts.component';
import { LiveriesComponent } from './components/liveries/liveries.component';

@NgModule({
  declarations: [
    AircraftsComponent,
    LiveriesComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ]
})
export class ModsModule { }

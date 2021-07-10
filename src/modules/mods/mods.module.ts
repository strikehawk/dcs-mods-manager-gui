import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { AircraftsComponent } from './components/aircrafts/aircrafts.component';
import { LiveriesComponent } from './components/liveries/liveries.component';
import { TechModulesComponent } from './components/tech-modules/tech-modules.component';
import { AircraftKneeboardsComponent } from './components/aircraft-kneeboards/aircraft-kneeboards.component';

@NgModule({
  declarations: [
    AircraftsComponent,
    LiveriesComponent,
    TechModulesComponent,
    AircraftKneeboardsComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ]
})
export class ModsModule { }

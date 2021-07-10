import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { AircraftsComponent } from './components/aircrafts/aircrafts.component';
import { LiveriesComponent } from './components/liveries/liveries.component';
import { TechModulesComponent } from './components/tech-modules/tech-modules.component';

@NgModule({
  declarations: [
    AircraftsComponent,
    LiveriesComponent,
    TechModulesComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ]
})
export class ModsModule { }

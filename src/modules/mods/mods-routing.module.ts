import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AircraftsComponent } from './components/aircrafts/aircrafts.component';
import { LiveriesComponent } from './components/liveries/liveries.component';
import { TechModulesComponent } from './components/tech-modules/tech-modules.component';
import { AircraftKneeboardsComponent } from './components/aircraft-kneeboards/aircraft-kneeboards.component';

const routes: Routes = [
  {
    path: "mods/aircrafts",
    component: AircraftsComponent
  },
  {
    path: "mods/liveries",
    component: LiveriesComponent
  },
  {
    path: "mods/tech-modules",
    component: TechModulesComponent
  },
  {
    path: "mods/aircraft-kneeboards",
    component: AircraftKneeboardsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModsRoutingModule {}

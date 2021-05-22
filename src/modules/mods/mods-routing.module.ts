import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AircraftsComponent } from './components/aircrafts/aircrafts.component';
import { LiveriesComponent } from './components/liveries/liveries.component';

const routes: Routes = [
  {
    path: "mods/aircrafts",
    component: AircraftsComponent
  },
  {
    path: "mods/liveries",
    component: LiveriesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModsRoutingModule {}

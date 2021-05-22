import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../modules/shared/components';

import { HomeRoutingModule } from '../modules/home/home-routing.module';
import { ModsRoutingModule } from '../modules/mods/mods-routing.module';
import { ConfigurationRoutingModule } from '../modules/configuration/configuration-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'configuration',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    ConfigurationRoutingModule,
    ModsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

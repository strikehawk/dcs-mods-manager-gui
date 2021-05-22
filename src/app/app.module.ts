import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";

import { MessageService } from "primeng/api";
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { CoreModule } from '../modules/core/core.module';
import { SharedModule } from '../modules/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from '../modules/home/home.module';
import { ModsModule } from '../modules/mods/mods.module';
import { ConfigurationModule } from '../modules/configuration/configuration.module';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MessagesModule,
    MessageModule,
    CoreModule,
    SharedModule,
    HomeModule,
    ModsModule,
    ConfigurationModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

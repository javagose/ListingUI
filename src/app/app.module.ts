import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
//hashbang Urls
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { InputTextModule, ButtonModule }  from 'primeng/primeng';

// import Rapport Module
import { RapportModule } from './rapport-module/rapport.module';

// import Colonne Module
import { ColonneModule } from './colonne-module/colonne.module';

//import Shared Module
import { Qs_SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { Configuration } from './configuration';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule, 
    ButtonModule,
    RapportModule,
    ColonneModule,
    Qs_SharedModule
  ],
  providers: [ Configuration, {provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationModule} from "./authentication/authentication.module";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {GrowlModule} from "primeng/growl";
import {MessageService} from "primeng/components/common/messageservice";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( routes ),
    AuthenticationModule,
    GrowlModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

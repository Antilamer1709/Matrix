import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationModule} from "./authentication/authentication.module";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {GrowlModule} from "primeng/growl";
import {MessageService} from "primeng/components/common/messageservice";
import {CustomHttpInterceptor} from "./common/http-interceptor";

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
  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

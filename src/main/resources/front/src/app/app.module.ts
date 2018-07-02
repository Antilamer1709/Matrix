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
import {TopicModule} from "./topic/topic.module";
import {BlockUIModule} from "primeng/blockui";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( routes, { useHash: true } ),
    AuthenticationModule,
    GrowlModule,
    TopicModule,
    BlockUIModule,
    MenubarModule,
    ButtonModule
  ],
  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

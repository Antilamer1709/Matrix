import {Route} from "@angular/router";
import {LoginComponent} from "./login/login.component";

export const AuthenticationRoutes: Route[] = [
  {
    path: 'login', component: LoginComponent
  }
];

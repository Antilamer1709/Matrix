import {Routes} from "@angular/router";
import {AuthenticationRoutes} from "./authentication/authentication.routes";
import {TopicRoutes} from "./topic/topic.routes";

export const routes: Routes = [

  ...AuthenticationRoutes,
  ...TopicRoutes,

  { path: '**',
    redirectTo: '/topic'
  }

];

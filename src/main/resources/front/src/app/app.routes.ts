import {Routes} from "@angular/router";
import {AuthenticationRoutes} from "./authentication/authentication.routes";
import {TopicRoutes} from "./topic/topic.routes";
import {UserProfile} from "./user-profile/user-profile.routes";

export const routes: Routes = [

  ...AuthenticationRoutes,
  ...TopicRoutes,
  ...UserProfile,

  { path: '**',
    redirectTo: '/topic'
  }

];

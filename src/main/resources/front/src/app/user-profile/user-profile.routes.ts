import {Route} from "@angular/router";
import {UserProfileComponent} from "./user-profile/user-profile.component";

export const UserProfile: Route[] = [
  { path: 'user/:id', component: UserProfileComponent }
];

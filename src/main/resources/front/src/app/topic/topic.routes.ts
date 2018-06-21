import {Route} from "@angular/router";
import {TopicListComponent} from "./topic-list/topic-list.component";

export const TopicRoutes: Route[] = [
  {
    path: 'topic', component: TopicListComponent
  }
];

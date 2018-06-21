import {Route} from "@angular/router";
import {TopicListComponent} from "./topic-list/topic-list.component";
import {TopicComponent} from "./topic/topic.component";

export const TopicRoutes: Route[] = [
  { path: 'topic', component: TopicListComponent },
  { path: 'topic/:id', component: TopicComponent }
];

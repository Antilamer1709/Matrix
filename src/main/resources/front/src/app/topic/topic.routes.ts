import {Route} from "@angular/router";
import {TopicListComponent} from "./topic-list/topic-list.component";
import {TopicComponent} from "./topic/topic.component";
import {NewTopicComponent} from "./new-topic/new-topic.component";
import {EvidenceComponent} from "./evidence/evidence.component";

export const TopicRoutes: Route[] = [
  { path: 'topic', component: TopicListComponent },
  { path: 'topic/new', component: NewTopicComponent },
  { path: 'topic/:id', component: TopicComponent },
  { path: 'topic/:id/evidence/new', component: EvidenceComponent }
];

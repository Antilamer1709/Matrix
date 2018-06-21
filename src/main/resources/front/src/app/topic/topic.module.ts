import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicCardComponent } from './topic-list/topic-card/topic-card.component';
import { TopicComponent } from './topic/topic.component';
import { NewTopicComponent } from './new-topic/new-topic.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TopicListComponent, TopicCardComponent, TopicComponent, NewTopicComponent]
})
export class TopicModule { }

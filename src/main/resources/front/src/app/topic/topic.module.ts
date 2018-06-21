import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicCardComponent } from './topic-list/topic-card/topic-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TopicListComponent, TopicCardComponent]
})
export class TopicModule { }

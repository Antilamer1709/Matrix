import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicCardComponent } from './topic-list/topic-card/topic-card.component';
import { TopicComponent } from './topic/topic.component';
import { NewTopicComponent } from './new-topic/new-topic.component';
import {DropdownModule, EditorModule, InputTextareaModule, PaginatorModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EvidenceComponent } from './evidence/evidence.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    BrowserAnimationsModule,
    EditorModule,
    PaginatorModule,
    RouterModule
  ],
  declarations: [TopicListComponent, TopicCardComponent, TopicComponent, NewTopicComponent, EvidenceComponent]
})
export class TopicModule { }

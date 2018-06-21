import { Component, OnInit } from '@angular/core';
import {TopicService} from "./topic.service";
import {TopicDTO} from "./topic-model";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topics: TopicDTO[];

  constructor(private topicService: TopicService) { }

  ngOnInit() {
    this.initTopics();
  }

  private initTopics(): void {
    this.topicService.getAllTopics().subscribe(res => {
      this.topics = res;
    });
  }

}

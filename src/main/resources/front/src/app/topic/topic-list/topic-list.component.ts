import { Component, OnInit } from '@angular/core';
import {TopicService} from "../topic.service";
import {TopicDTO} from "../topic-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topic',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  topics: TopicDTO[];

  constructor(private topicService: TopicService,
              private router: Router) { }

  ngOnInit() {
    this.initTopics();
  }

  private initTopics(): void {
    this.topicService.getAllTopics().subscribe(res => {
      this.topics = res;
    });
  }

  public onTopicClick(topic: TopicDTO): void {
    this.router.navigate(['/topic/' + topic.id]);
  }

}

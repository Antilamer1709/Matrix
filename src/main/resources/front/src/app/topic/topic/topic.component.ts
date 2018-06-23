import {Component, OnInit} from '@angular/core';
import {TopicDTO} from "../topic-model";
import {TopicService} from "../topic.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topicId: number;
  topic: TopicDTO;

  constructor(private topicService: TopicService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.initTopicId();
    this.initTopic();
  }

  private initTopicId(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.topicId = params['id'];
    });
  }

  private initTopic(): void {
    this.topicService.getTopic(this.topicId).subscribe( res => {
      this.topic = res;
    })
  }

}

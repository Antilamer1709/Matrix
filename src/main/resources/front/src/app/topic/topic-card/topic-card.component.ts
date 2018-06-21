import {Component, Input, OnInit} from '@angular/core';
import {TopicDTO} from "../topic-model";

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.css']
})
export class TopicCardComponent implements OnInit {

  @Input('topic')
  topic: TopicDTO;

  constructor() { }

  ngOnInit() {
  }

}

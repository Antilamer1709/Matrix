import { Component, OnInit } from '@angular/core';
import {TopicDTO} from "../topic-model";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topic: TopicDTO;

  constructor() { }

  ngOnInit() {
  }

}

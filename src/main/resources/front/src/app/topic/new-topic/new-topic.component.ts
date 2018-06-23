import { Component, OnInit } from '@angular/core';
import {TopicDTO} from "../topic-model";
import {FormGroup} from "@angular/forms";
import {TopicService} from "../topic.service";
import {MessageService} from "primeng/components/common/messageservice";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {

  topic: TopicDTO;

  constructor(private topicService: TopicService,
              private appService: AppService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.topic = new TopicDTO();
    this.topic.hypotheses = [""];
  }

  public createTopic(form: FormGroup): void {
    if (form.valid) {
      this.appService.blockedUI = true;
      this.topicService.createTopic(this.topic).subscribe(
        (res) => {
          console.log(res);
          this.messageService.add({severity:'info', summary:'Topic', detail:'New topic has been created!'});
          this.appService.blockedUI = false;
        }, (err) => {
          this.appService.blockedUI = false;
        }
      );
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Please, fill all fields in correct way!'});
    }
  }

  public addHypothese(): void {
    this.topic.hypotheses.push("");
  }

  public removeHypothese(index: number): void {
    if (this.topic.hypotheses.length > 1) {
      this.topic.hypotheses.splice(index, 1);
    } else {
      this.topic.hypotheses = [""];
    }
  }

  public trackByFn(item, id){
    return item
  }

}

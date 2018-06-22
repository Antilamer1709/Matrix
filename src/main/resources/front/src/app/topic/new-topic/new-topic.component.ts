import { Component, OnInit } from '@angular/core';
import {TopicDTO} from "../topic-model";
import {FormGroup} from "@angular/forms";
import {TopicService} from "../topic.service";
import {MessageService} from "primeng/components/common/messageservice";

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {

  topic: TopicDTO;

  constructor(private topicService: TopicService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.topic = new TopicDTO();
  }

  public createTopic(form: FormGroup): void {
    if (form.valid) {
      this.topicService.createTopic(this.topic).subscribe(
        (res) => {
          console.log(res);
          this.messageService.add({severity:'info', summary:'Topic', detail:'New topic has been created!'});
        }
      );
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Please, fill all fields in correct way!'});
    }
  }

}

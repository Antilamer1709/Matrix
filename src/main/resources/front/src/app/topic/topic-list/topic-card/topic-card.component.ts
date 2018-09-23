import {Component, Input, OnInit} from '@angular/core';
import {TopicDTO} from "../../topic-model";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {AppService} from "../../../app.service";
import {MessageService} from "primeng/components/common/messageservice";
import {Router} from "@angular/router";
import {TopicService} from "../../topic.service";

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.css']
})
export class TopicCardComponent implements OnInit {

  @Input('topic')
  topic: TopicDTO;

  constructor(public authenticationService: AuthenticationService,
              private topicService: TopicService,
              private appService: AppService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
  }

  public isDeleteButtonVisible(): boolean {
    if (this.authenticationService.hasAdminRole()) {
      return true;
    }
  }

  public onDeleteClick(topic: TopicDTO): void {
    this.appService.blockedUI = true;

    this.topicService.deleteTopic(topic).subscribe(
      (res) => {
        console.log(res);
        this.appService.blockedUI = false;
        this.messageService.add({severity:'info', summary:'Success', detail: 'Topic has been deleted!'});
        this.router.navigate(['/']);
      }
    );
  }

  public onTopicClick(topic: TopicDTO): void {
    this.router.navigate(['/topic/' + topic.id]);
  }

}

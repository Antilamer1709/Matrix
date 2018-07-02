import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../authentication/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {TopicService} from "../topic.service";
import {EvidenceService} from "../topic/evidence.service";
import {EvidenceDTO, TopicDTO} from "../topic-model";
import {CommonComponent} from "../../common/common-component";
import {SelectItem} from "primeng/api";
import {MessageService} from "primeng/components/common/messageservice";

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent extends CommonComponent implements OnInit {

  comment: string = "";

  disabled: boolean = false;
  topicId: number;
  evidenceId: string;
  topic: TopicDTO = new TopicDTO();
  evidence: EvidenceDTO;

  constructor(public authenticationService: AuthenticationService,
              private messageService: MessageService,
              private topicService: TopicService,
              private evidenceService: EvidenceService,
              private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.initRouteParams();
    this.initTopic();
    this.initEvidence();
    this.initDicts();
  }

  private initRouteParams(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.topicId = params['id'];
      this.evidenceId = params['evidenceId'];
      console.log(this.evidenceId)
    });
  }

  private initTopic(): void {
    this.topicService.getTopic(this.topicId).subscribe( res => {
      this.topic = res;
    })
  }

  private initEvidence(): void {
    this.evidence = new EvidenceDTO();
    this.evidence.hypotheses = {};
    this.evidence.topicId = this.topicId;

    if (this.evidenceId != 'new') {
      this.evidenceService.getEvidence(Number(this.evidenceId)).subscribe(res => {
        this.evidence = res;
      })
    }
  }

  public submit(form: FormGroup): void {
    console.log(this.evidence);

    if (form.valid) {
      this.evidenceService.createEvidence(this.evidence).subscribe(
        (res) => {
          console.log(res);
          this.messageService.add({severity:'info', summary:'Success', detail:'Evidence has been created!'});
        }
      );
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Please, fill all fields in correct way!'});
    }
  }

  public addComment(form: FormGroup): void {

  }

  public getSupportModel(index): any {
    return this.evidence.hypotheses[index];
  }

  public onSupportChange(event, index): any {
    this.evidence.hypotheses[index] = event.value;
  }

}

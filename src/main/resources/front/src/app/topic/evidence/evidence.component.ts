import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../authentication/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {TopicService} from "../topic.service";
import {EvidenceService} from "../topic/evidence.service";
import {EvidenceDTO, TopicDTO} from "../topic-model";
import {CommonComponent} from "../../common/common-component";
import {SelectItem} from "primeng/api";

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
    this.evidence.hypotheses = new Map<number, string>();
  }

  public submit(form: FormGroup): void {
    console.log(this.evidence)
  }

  public addComment(form: FormGroup): void {

  }

  public getSupportModel(index): any {
    // return this.suppotOptions[index + 1].value;
  }

  public onSupportChange(event, index): any {
    this.evidence.hypotheses.set(index, event);
  }

}

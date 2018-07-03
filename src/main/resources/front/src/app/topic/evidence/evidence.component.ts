import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../authentication/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {TopicService} from "../topic.service";
import {EvidenceService} from "../topic/evidence.service";
import {EvidenceCommentDTO, EvidenceDTO, TopicDTO} from "../topic-model";
import {CommonComponent} from "../../common/common-component";
import {SelectItem} from "primeng/api";
import {MessageService} from "primeng/components/common/messageservice";
import {v} from "@angular/core/src/render3";

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent extends CommonComponent implements OnInit {

  commentDTO: EvidenceCommentDTO;
  comments: EvidenceCommentDTO[];
  totalCommentRecords: number;

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
    this.initEvidence();
    this.initDicts();
    this.initComments();
  }

  private initRouteParams(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.topicId = params['id'];
      this.evidenceId = params['evidenceId'];
      console.log(this.evidenceId);
      this.initTopic();
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
    this.commentDTO = new EvidenceCommentDTO();

    if (this.evidenceId != 'new') {
      this.evidenceService.getEvidence(Number(this.evidenceId)).subscribe(res => {
        this.evidence = res;
        this.disabled = true;
      })
    }
  }

  public submit(form: FormGroup): void {
    console.log(this.evidence);

    if (form.valid) {
      if (this.evidenceId != 'new') {
        this.evidenceService.editEvidence(this.evidence).subscribe(
          (res) => {
            console.log(res);
            this.messageService.add({severity:'info', summary:'Success', detail:'Evidence has been edited!'});
          }
        );
      } else {
        this.evidenceService.createEvidence(this.evidence).subscribe(
          (res) => {
            console.log(res);
            this.messageService.add({severity:'info', summary:'Success', detail:'Evidence has been created!'});
          }
        );
      }
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Please, fill all fields in correct way!'});
    }
  }

  public addComment(form: FormGroup): void {
    this.commentDTO.evidenceId = Number(this.evidenceId);
    if (this.commentDTO && this.commentDTO.comment && this.commentDTO.comment.trim().length > 0) {
      this.evidenceService.addComment(this.commentDTO).subscribe(
        (res) => {
          console.log(res);
          this.initEvidence();
          this.messageService.add({severity:'info', summary:'Success', detail:'Comment has been added!'});
        }
      );
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Please, fill all fields in correct way!'});
    }
  }

  public getSupportModel(index): any {
    return this.evidence.hypotheses[index];
  }

  public onSupportChange(event, index): any {
    this.evidence.hypotheses[index] = event.value;
  }

  public isEditButtonVisible(): boolean {
    if (!this.disabled) {
      return false;
    }

    if (this.authenticationService.loggedUser && this.evidence && this.evidence.creator
      && this.evidence.creator.id === this.authenticationService.loggedUser.id) {
      return true;
    }
  }

  public onEditClick(): void {
    this.disabled = false;
  }

  private initComments(): void {
    if (this.evidenceId != 'new') {
      let event = {
        first: 0,
        page: 0,
        rows: 15,
        pageCount: 10
      };

      this.paginateComments(event);
    }
  }

  public paginateComments(event): void {
    console.log(event);
    this.evidenceService.searchComments(Number(this.evidenceId), event).subscribe(x => {
      this.totalCommentRecords = x.totalElements;
      this.comments = x.data;
    });
  }

}

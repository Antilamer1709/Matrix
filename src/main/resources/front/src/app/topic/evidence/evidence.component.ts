import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../authentication/authentication.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TopicService} from "../topic.service";
import {EvidenceService} from "../topic/evidence.service";
import {EvidenceCommentDTO, EvidenceDTO, TopicDTO} from "../topic-model";
import {CommonComponent} from "../../common/common-component";
import {ConfirmationService, SelectItem} from "primeng/api";
import {MessageService} from "primeng/components/common/messageservice";
import {v} from "@angular/core/src/render3";
import {AppService} from "../../app.service";

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
              private appService: AppService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private confirmationService: ConfirmationService) {
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
      this.appService.blockedUI = true;

      this.evidenceService.saveEvidence(this.evidence, this.evidenceId != 'new').subscribe(
        (res) => {
          console.log(res);
          this.appService.blockedUI = false;
          this.messageService.add({severity:'info', summary:'Success',
            detail: this.evidenceId != 'new' ? 'Evidence has been edited!' : 'Evidence has been created!'});
          this.router.navigate(['/topic/' + this.topicId]);
        }
      );

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
          this.initComments();
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

  public onDeleteClick(): void {
    this.appService.blockedUI = true;

    this.evidenceService.deleteEvidence(this.evidence).subscribe(
      (res) => {
        console.log(res);
        this.appService.blockedUI = false;
        this.messageService.add({severity:'info', summary:'Success', detail: 'Evidence has been deleted!'});
        this.router.navigate(['/topic/' + this.topicId]);
      }
    );
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

  public showDeleteComment(commnet: EvidenceCommentDTO): boolean {
    if (this.authenticationService.loggedUser) {
      if (this.authenticationService.loggedUser.id === commnet.user.id) {
        return true;
      }
      if (this.authenticationService.hasAdminRole()) {
        return true;
      }
    }

    return false;
  }

  public deleteComment(commnet: EvidenceCommentDTO): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the comment?',
      header: 'Delete comment',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.evidenceService.deleteComment(commnet).subscribe(
          (res) => {
            console.log(res);
            this.initComments();
            this.messageService.add({severity:'info', summary:'Success', detail:'Comment has been deleted!'});
          }
        );
      }
    });
  }

}

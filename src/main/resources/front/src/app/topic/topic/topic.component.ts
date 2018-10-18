import {Component, OnInit} from '@angular/core';
import {EvidenceDTO, TopicDTO} from "../topic-model";
import {TopicService} from "../topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {EvidenceService} from "./evidence.service";
import {CommonComponent} from "../../common/common-component";
import {AuthenticationService} from "../../authentication/authentication.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent extends CommonComponent implements OnInit {

  loading: boolean;
  edit: boolean;
  totalRecords: number;
  cols: any[];
  data: EvidenceDTO[];

  topicId: number;
  topic: TopicDTO = new TopicDTO();

  constructor(public authenticationService: AuthenticationService,
              private appService: AppService,
              private messageService: MessageService,
              private topicService: TopicService,
              private evidenceService: EvidenceService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.loading = false;
    this.edit = false;
    this.initDicts();
    this.initColumns();
    this.initTopicId();
    this.initTopic();
  }

  private initTopicId(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.topicId = params['id'];
    });
  }

  private initTopic(): void {
    this.topicService.getTopic(this.topicId).subscribe(res => {
      this.topic = res;
      this.addHypotheseColumns();
    })
  }

  /**
   * method that chcecks is column are hypotheses or not. addHypotheseColumns() marks hypotheses columns with indexes from array
   * @param col
   * @returns {string}
   */
  public getHeaderValue(col): string {
    if (isNaN(Number(col.field))) {
      return col.header;
    } else {
      return this.topic.hypotheses[col.field];
    }
  }

  public getEvidenceValue(rowData, col): string {
    if (isNaN(Number(col.field))) {
      return rowData[col.field]
    } else {
      return rowData.hypotheses[col.field];
    }
  }

  private addHypotheseColumns(): void {
    for (let i = 0; i < this.topic.hypotheses.length; i++) {
      //for hypothese fields used indexes from topic.hypotheses array
      this.cols.push({field: i, header: 'Hypothese ' + (i + 1)})
    }
  }

  public loadEvidences(event: LazyLoadEvent) {
    setTimeout(() => {
      this.loading = true;
    });
    this.evidenceService.getEvidences(this.topicId, event).subscribe(x => {
      this.loading = false;
      this.totalRecords = x.totalElements;
      this.data = x.data;
    });
  }

  public getSortableColumn(field) {
    if (isNaN(Number(field))) {
      return field;
    } else {
      return false;
    }
  }

  public showSortIcon(field): boolean {
    return isNaN(Number(field));
  }

  public addEvidence(): void {
    this.router.navigate(['topic/' + this.topicId + '/evidence/new']);
  }

  public onEditToggle(): void {
    this.edit = !this.edit;
  }

  public onSaveClick(): void {
    this.appService.blockedUI = true;

    this.topicService.editTopic(this.topic).subscribe(
      (res) => {
        console.log(res);
        this.appService.blockedUI = false;
        this.edit = false;
        this.messageService.add({severity:'info', summary:'Success', detail: 'Success!'});
      }
    );
  }

  private initColumns(): void {
    this.cols = [
      {field: 'evidence', header: 'Evidence'},
      {field: 'source', header: 'Source'},
      {field: 'credibility', header: 'Credibility'}
    ];
  }


  public onRowSelect(event): void {
    this.router.navigate(['topic/' + this.topicId + '/evidence/' + event.data.id]);
  }

}

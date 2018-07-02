import {Component, OnInit} from '@angular/core';
import {EvidenceDTO, TopicDTO} from "../topic-model";
import {TopicService} from "../topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LazyLoadEvent, SelectItem} from "primeng/api";
import {EvidenceService} from "./evidence.service";
import {CommonComponent} from "../../common/common-component";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent extends CommonComponent implements OnInit {

  loading: boolean;
  totalRecords: number;
  cols: any[];
  data: EvidenceDTO[];

  topicId: number;
  topic: TopicDTO = new TopicDTO();

  constructor(private topicService: TopicService,
              private evidenceService: EvidenceService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.loading = false;
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
    this.topicService.getTopic(this.topicId).subscribe( res => {
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
    for (let i = 0; i < this.topic.hypotheses.length ; i++) {
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

  private initColumns(): void {
    this.cols = [
      { field: 'evidence', header: 'Evidence' },
      { field: 'source', header: 'Source' },
      { field: 'credibility', header: 'Credibility' }
    ];
  }

  private getColorStyle(rowData, col): string {
    let field = this.getFieldValue(rowData, col);
    switch (field) {
      case "0": {
        return null;
      }
      case "++": {
        return 'veryGoodCell';
      }
      case "+": {
        return 'goodCell';
      }
      case "-": {
        return 'badCell';
      }
      case "--": {
        return 'varyBadCell';
      }
      default: {
        return null
      }
    }
  }
  private getFieldValue(rowData, col): string {
    if (isNaN(Number(col.field))) {
      return rowData[col.field]
    } else {
      return rowData.hypotheses[col.field];
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {EvidenceDTO, TopicDTO} from "../topic-model";
import {TopicService} from "../topic.service";
import {ActivatedRoute, Params} from "@angular/router";
import {LazyLoadEvent} from "primeng/api";
import {EvidenceService} from "./evidence.service";
import {SearchDTO} from "../../common/common-model";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  loading: boolean;
  totalRecords: number;
  cols: any[];

  topicId: number;
  topic: TopicDTO = new TopicDTO();

  constructor(private topicService: TopicService,
              private evidenceService: EvidenceService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = false;
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
   * @param evidence
   * @param col
   * @returns {string}
   */
  public getEvidenceValue(evidence, col): string {
    if (isNaN(Number(col.field))) {
      return evidence[col.field]
    } else {
      return this.topic.hypotheses[col.field];
    }
  }

  private addHypotheseColumns(): void {
    for (let i = 0; i < this.topic.hypotheses.length ; i++) {
      //for hypothese fields used indexes from topic.hypotheses array
      this.cols.push({field: i, header: 'Hypothese ' + (i + 1)})
    }
  }

  loadEvidences(event: LazyLoadEvent) {
    this.loading = true;
    this.loading = false;
    this.evidenceService.getEvidences(event).subscribe(x => {

    });

  }

  private initColumns(): void {
    this.cols = [
      { field: 'evidence', header: 'Evidence' },
      { field: 'source', header: 'Source' }
    ];
  }

}

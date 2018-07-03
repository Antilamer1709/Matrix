import { Component, OnInit } from '@angular/core';
import {UserDTO} from "../../authentication/authentication-model";
import {MessageService} from "primeng/components/common/messageservice";
import {UserProfileService} from "../user-profile.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CommonComponent} from "../../common/common-component";
import {EvidenceDTO} from "../../topic/topic-model";
import {LazyLoadEvent} from "primeng/api";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends CommonComponent implements OnInit {

  loading: boolean = false;
  totalRecords: number;
  cols: any[];
  data: EvidenceDTO[];

  public userId: number;
  public user: UserDTO = new UserDTO();

  constructor(private messageService: MessageService,
              private userProfileService: UserProfileService,
              private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.initRouteParams();
    this.initColumns();
  }

  private initRouteParams(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      console.log(this.userId);
      this.initUser();
    });
  }

  private initUser(): void {
    this.userProfileService.getUser(this.userId).subscribe(res => {
      this.user = res;
    });
  }

  public loadEvidences(event: LazyLoadEvent) {
    setTimeout(() => {
      this.loading = true;
    });
    this.userProfileService.getEvidences(this.userId, event).subscribe(x => {
      this.loading = false;
      this.totalRecords = x.totalElements;
      this.data = x.data;
    });
  }

  public onRowSelect(event): void {
    // this.router.navigate(['topic/' + this.topicId + '/evidence/' + event.data.id]);
  }

  private initColumns(): void {
    this.cols = [
      { field: 'evidence', header: 'Evidence' },
      { field: 'source', header: 'Source' },
      { field: 'credibility', header: 'Credibility' }
    ];
  }

}

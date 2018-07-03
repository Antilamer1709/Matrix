import { Component, OnInit } from '@angular/core';
import {UserDTO} from "../../authentication/authentication-model";
import {MessageService} from "primeng/components/common/messageservice";
import {UserProfileService} from "../user-profile.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public userId: number;
  public user: UserDTO = new UserDTO();

  constructor(private messageService: MessageService,
              private userProfileService: UserProfileService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initRouteParams();
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

}

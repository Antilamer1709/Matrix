import {Component, OnInit} from '@angular/core';
import {Message} from "primeng/api";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public msgs: Message[] = [];

  constructor(public authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initLoggedUser();
  }

  private initLoggedUser(): void {
    this.authenticationService.getLoggedUser().subscribe(
      res => {
        console.log("loggedUser: ");
        console.log(res);
      },
      error => {
        // this.handleException(error);
      }
    );
  }

}

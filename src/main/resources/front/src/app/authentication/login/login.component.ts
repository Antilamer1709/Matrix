import { Component, OnInit } from '@angular/core';
import {UserDTO} from "../authentication-model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UserDTO;
  private returnUrl: string;

  constructor(private service: LoginService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = new UserDTO();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public login(form: FormGroup): void {
    if (form.valid) {
      this.service.authenticate(this.user).subscribe(
        (res) => {
          console.log(res);
          // this.messageService.add({severity:'info', summary:'Hello', detail:'You are logged in!'});
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.handleException(error);
        }
      );
    } else {
      // this.handleFormErrors(form);
    }
  }

}

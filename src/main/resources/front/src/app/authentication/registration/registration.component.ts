import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "./registration.service";
import {MessageService} from "primeng/components/common/messageservice";
import {Router} from "@angular/router";
import {RegistrationModel} from "../authentication-model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registration: RegistrationModel;

  constructor(private service: RegistrationService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.registration = new RegistrationModel();
  }

  public register(form: FormGroup): void {
    console.log(form);
    if (form.valid && this.registration.password === this.registration.confirmPassword) {
      this.service.register(this.registration).subscribe(
        () => {
          this.messageService.add({severity:'info', summary:'Registration', detail:'You can log in now!'});
          this.router.navigate(['/authentication/login']);
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

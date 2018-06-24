import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

  comment: string = "";

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public addComment(form: FormGroup): void {

  }

}

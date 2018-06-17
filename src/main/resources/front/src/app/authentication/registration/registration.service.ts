import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {RegistrationModel} from "../authentication-model";
import {Observable} from "rxjs/internal/Observable";
import {CommonService} from "../../common/common.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends CommonService {

  constructor(private http: HttpClient, router: Router) {
    super(router);
  }

  register(registration: RegistrationModel): Observable<any> {
    return this.http.post('api/authentication/registration', registration, {headers: this.getHeaders()});
  }

}

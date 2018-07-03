import {Injectable} from '@angular/core';
import {CommonService} from "../../common/common.service";
import {UserDTO} from "../authentication-model";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LoginService extends CommonService {

  constructor(private http: HttpClient) {
    super()
  }

  authenticate(login: UserDTO): Observable<any> {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', login.username);
    urlSearchParams.append('password', login.password);
    let body = urlSearchParams.toString();

    return this.http.post('api/authenticate', body, {headers: this.getEncodedHeaders()});
  }

}

import {Router} from "@angular/router/router";
import {HttpHeaders} from "@angular/common/http";

export class CommonService {

  constructor(protected router: Router) {
  }

  protected getEncodedHeaders(): HttpHeaders {
    return new HttpHeaders(
      {'Content-Type': 'application/x-www-form-urlencoded'}
    );
  }

}

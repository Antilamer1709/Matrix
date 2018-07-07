import {HttpHeaders} from "@angular/common/http";
import {SearchDTO} from "./common-model";
import {LazyLoadEvent} from "primeng/api";

export class CommonService {

  constructor() {
  }

  protected getEncodedHeaders(): HttpHeaders {
    return new HttpHeaders(
      {'Content-Type': 'application/x-www-form-urlencoded'}
    );
  }

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    );
  }

  protected createCommonSearchDTO<T>(event: LazyLoadEvent): SearchDTO<T> {
    let searchDTO = new SearchDTO<T>();
    searchDTO.first = event.first;
    searchDTO.rows = event.rows;

    // sortField is string in primeng lib, therefore used comparation  whith != 'false'
    if (event.sortField && event.sortField.toString() != 'false') {
      searchDTO.sortField = event.sortField;
      searchDTO.sortOrder = event.sortOrder;
    }

    return searchDTO;
  }

}

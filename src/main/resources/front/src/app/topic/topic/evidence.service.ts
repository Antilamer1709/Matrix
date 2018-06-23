import { Injectable } from '@angular/core';
import {EvidenceDTO} from "../topic-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {ResponseDTO, SearchDTO} from "../../common/common-model";
import {LazyLoadEvent} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class EvidenceService {

  constructor(private http: HttpClient) { }

  getEvidences(event: LazyLoadEvent): Observable<ResponseDTO<EvidenceDTO[]>> {
    let searchDTO = this.createSearchDTO(event);
    return this.http.post<ResponseDTO<EvidenceDTO[]>>('/api/evidence/search', searchDTO);
  }

  private createSearchDTO(event: LazyLoadEvent): SearchDTO<EvidenceDTO> {
    let searchDTO = new SearchDTO<EvidenceDTO>();
    searchDTO.first = event.first;
    searchDTO.rows = event.rows;
    searchDTO.sortField = event.sortField;
    searchDTO.sortOrder = event.sortOrder;

    searchDTO.filter = new EvidenceDTO();

    return searchDTO;
  }

}

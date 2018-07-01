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

  getEvidences(topicId: number, event: LazyLoadEvent): Observable<ResponseDTO<EvidenceDTO[]>> {
    let searchDTO = this.createSearchDTO(topicId, event);
    return this.http.post<ResponseDTO<EvidenceDTO[]>>('/api/evidence/search', searchDTO);
  }

  private createSearchDTO(topicId: number, event: LazyLoadEvent): SearchDTO<EvidenceDTO> {
    let searchDTO = new SearchDTO<EvidenceDTO>();
    searchDTO.id = topicId;
    searchDTO.first = event.first;
    searchDTO.rows = event.rows;
    searchDTO.sortField = event.sortField;
    searchDTO.sortOrder = event.sortOrder;

    searchDTO.filter = new EvidenceDTO();
    for (let field in event.filters) {
      searchDTO.filter[field] = event.filters[field].value;
    }

    return searchDTO;
  }

  createEvidence(evidence: EvidenceDTO): Observable<any> {
    return this.http.post('/api/evidence/create', evidence);
  }

}

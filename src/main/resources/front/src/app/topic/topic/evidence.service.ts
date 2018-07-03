import { Injectable } from '@angular/core';
import {EvidenceCommentDTO, EvidenceDTO, TopicDTO} from "../topic-model";
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
    let searchDTO = this.createSearchEvidenceDTO(topicId, event);
    return this.http.post<ResponseDTO<EvidenceDTO[]>>('/api/evidence/search', searchDTO);
  }

  private createSearchEvidenceDTO(topicId: number, event: LazyLoadEvent): SearchDTO<EvidenceDTO> {
    let searchDTO = this.createCommonSearchDTO<EvidenceDTO>(event);

    searchDTO.filter = new EvidenceDTO();
    searchDTO.filter.hypotheses = {};
    searchDTO.filter.topicId = searchDTO.id = topicId;

    for (let field in event.filters) {
      if (isNaN(Number(field))) {
        searchDTO.filter[field] = event.filters[field].value;
      } else {
        // by index
        searchDTO.filter.hypotheses[field] = event.filters[field].value;
      }
    }

    return searchDTO;
  }

  private createCommonSearchDTO<T>(event: LazyLoadEvent): SearchDTO<T> {
    let searchDTO = new SearchDTO<T>();
    searchDTO.first = event.first;
    searchDTO.rows = event.rows;
    searchDTO.sortField = event.sortField;
    searchDTO.sortOrder = event.sortOrder;

    return searchDTO;
  }

  createEvidence(evidence: EvidenceDTO): Observable<any> {
    return this.http.post('/api/evidence/create', evidence);
  }

  editEvidence(evidence: EvidenceDTO): Observable<any> {
    return this.http.post('/api/evidence/edit', evidence);
  }

  getEvidence(id: number): Observable<EvidenceDTO> {
    return this.http.get<EvidenceDTO>('/api/evidence/getEvidence/' + id);
  }

  addComment(commentDTO: EvidenceCommentDTO): Observable<any> {
    return this.http.post('/api/evidence/addComment', commentDTO);
  }

  searchComments(evidenceId: number, event: LazyLoadEvent): Observable<ResponseDTO<EvidenceCommentDTO[]>> {
    let searchDTO = this.createSearchCommentDTO(evidenceId, event);
    return this.http.post<ResponseDTO<EvidenceCommentDTO[]>>('/api/evidence/searchComments', searchDTO);
  }

  private createSearchCommentDTO(evidenceId: number, event: LazyLoadEvent): SearchDTO<EvidenceCommentDTO> {
    let searchDTO = this.createCommonSearchDTO<EvidenceCommentDTO>(event);

    searchDTO.filter = new EvidenceCommentDTO();
    searchDTO.filter.evidenceId = searchDTO.id = evidenceId;

    return searchDTO;
  }

}

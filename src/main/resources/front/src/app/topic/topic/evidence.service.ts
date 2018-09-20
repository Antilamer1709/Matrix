import {Injectable} from '@angular/core';
import {EvidenceCommentDTO, EvidenceDTO} from "../topic-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {ResponseDTO, SearchDTO} from "../../common/common-model";
import {LazyLoadEvent} from "primeng/api";
import {CommonService} from "../../common/common.service";

@Injectable({
  providedIn: 'root'
})
export class EvidenceService extends CommonService {

  constructor(private http: HttpClient) {
    super();
  }

  getEvidences(topicId: number, event: LazyLoadEvent): Observable<ResponseDTO<EvidenceDTO[]>> {
    let searchDTO = this.createSearchEvidenceDTO(topicId, event);
    return this.http.post<ResponseDTO<EvidenceDTO[]>>('/api/evidence/search', searchDTO);
  }

  private createSearchEvidenceDTO(topicId: number, event: LazyLoadEvent): SearchDTO<EvidenceDTO> {
    let searchDTO = this.createCommonSearchDTO<EvidenceDTO>(event);

    searchDTO.filter = new EvidenceDTO();
    searchDTO.filter.hypotheses = {};
    searchDTO.filter.topicId = topicId;

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

  saveEvidence(evidence: EvidenceDTO, isEdit: boolean): Observable<any> {
    if (isEdit) {
      return this.editEvidence(evidence);
    } else {
      return this.createEvidence(evidence);
    }
  }

  private createEvidence(evidence: EvidenceDTO): Observable<any> {
    return this.http.post('/api/evidence/create', evidence);
  }

  private editEvidence(evidence: EvidenceDTO): Observable<any> {
    return this.http.post('/api/evidence/edit', evidence);
  }

  public deleteEvidence(evidence: EvidenceDTO): Observable<any> {
    return this.http.post('/api/evidence/delete', evidence);
  }

  getEvidence(id: number): Observable<EvidenceDTO> {
    return this.http.get<EvidenceDTO>('/api/evidence/getEvidence/' + id);
  }

  addComment(commentDTO: EvidenceCommentDTO): Observable<any> {
    return this.http.post('/api/evidence/addComment', commentDTO);
  }

  deleteComment(commentDTO: EvidenceCommentDTO): Observable<any> {
    return this.http.post('/api/evidence/deleteComment', commentDTO);
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

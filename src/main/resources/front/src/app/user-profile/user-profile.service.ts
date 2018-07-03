import {Injectable} from '@angular/core';
import {EvidenceDTO} from "../topic/topic-model";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "../authentication/authentication-model";
import {ResponseDTO, SearchDTO} from "../common/common-model";
import {LazyLoadEvent} from "primeng/api";
import {CommonService} from "../common/common.service";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends CommonService {

  constructor(private http: HttpClient) {
    super();
  }

  getUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>('/api/user/getUser/' + id);
  }

  getEvidences(topicId: number, event: LazyLoadEvent): Observable<ResponseDTO<EvidenceDTO[]>> {
    let searchDTO = this.createSearchEvidenceDTO(topicId, event);
    return this.http.post<ResponseDTO<EvidenceDTO[]>>('/api/user/searchEvidence', searchDTO);
  }

  private createSearchEvidenceDTO(userId: number, event: LazyLoadEvent): SearchDTO<EvidenceDTO> {
    let searchDTO = this.createCommonSearchDTO<EvidenceDTO>(event);

    searchDTO.filter = new EvidenceDTO();
    searchDTO.filter.userId = userId;

    for (let field in event.filters) {
      searchDTO.filter[field] = event.filters[field].value;
    }

    return searchDTO;
  }

}

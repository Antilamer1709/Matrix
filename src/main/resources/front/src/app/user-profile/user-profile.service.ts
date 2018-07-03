import { Injectable } from '@angular/core';
import {TopicDTO} from "../topic/topic-model";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "../authentication/authentication-model";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>('/api/user/getUser/' + id);
  }

}

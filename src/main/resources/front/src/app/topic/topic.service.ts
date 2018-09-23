import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {EvidenceDTO, TopicDTO} from "./topic-model";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  getAllTopics(): Observable<TopicDTO[]> {
    return this.http.get<TopicDTO[]>('/api/topic/getAllTopics');
  }

  createTopic(topic: TopicDTO): Observable<void> {
    return this.http.post<void>('/api/topic/create', topic);
  }

  public deleteTopic(topic: TopicDTO): Observable<void> {
    return this.http.post<void>('/api/topic/delete', topic);
  }

  getTopic(id: number): Observable<TopicDTO> {
    return this.http.get<TopicDTO>('/api/topic/getTopic/' + id);
  }

}

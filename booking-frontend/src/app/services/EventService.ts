import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Event } from '@angular/router';
import { EventWithDetailDto } from '../models/EventDto';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private  apiUrl = environment.apiUrl + '/Events';

  constructor(private http:HttpClient) {}
  
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getEventsByOrg(orgId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-org/${orgId}`);
  }
  getEventsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-user/${userId}`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEvent(dto: EventWithDetailDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }

  updateEvent(id: string, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

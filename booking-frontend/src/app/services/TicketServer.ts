import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { User } from '../models/UserDto';
import { TicketType } from '../models/TicketDto';

@Injectable({
  providedIn: 'root'
})
export class TicketServer {
  private apiUrl = environment.apiUrl + '/Ticket';

  constructor(private http: HttpClient) {}

  getTicketsByServer(id: string): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`${this.apiUrl}/${id}/tickets`);
  }

  getCustomersByServer(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${id}/customers`);
  }

  createServer(dto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }

  updateServer(id: string, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto);
  }

  deleteServer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

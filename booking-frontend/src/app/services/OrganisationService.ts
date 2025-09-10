import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { CreateOrganisationDto } from '../models/CreateOrganisationDto';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  private apiUrl = environment.apiUrl + '/Organisation';

  constructor(private http: HttpClient) {}

  createOrganisation(dto: CreateOrganisationDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }

  getMyOrganisations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-organisation`);
  }

  getOrganisationsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-user/${userId}`);
  }

  updateOrganisation(id: string, dto: CreateOrganisationDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto);
  }

  deleteOrganisation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

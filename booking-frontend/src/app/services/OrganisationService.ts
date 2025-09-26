import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { CreateOrganisationDto, InviteUserDto } from '../models/CreateOrganisationDto';
import { ApiResponse } from '../models/ApiResponseDto';
import { User, UserOrg } from '../models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  private apiUrl = environment.apiUrl + '/Organisation';

  constructor(private http: HttpClient) {}

   createOrganisation(dto: CreateOrganisationDto): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, dto);
  }

  inviteMember(dto: InviteUserDto): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/invite-user`, dto);
  }

  getMyOrganisations(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/my-organisation`);
  }

  getOrganisationsByUser(userId: string): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/by-user/${userId}`);
  }

  getUsersByOrganisation(orgId: string): Observable<ApiResponse<UserOrg[]>> {
    return this.http.get<ApiResponse<UserOrg[]>>(
      `${this.apiUrl}/users-by-organisation?orgId=${orgId}`
    );
  }

  updateOrganisation(id: string, dto: CreateOrganisationDto): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}`, dto);
  }

  deleteOrganisation(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}

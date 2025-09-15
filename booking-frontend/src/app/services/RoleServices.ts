import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { ApiResponse } from '../models/ApiResponseDto';

export interface RolePermission {
  permissionId: string;
  permissionName: string;
  isGranted: boolean;
}

export interface Role {
  id: string;
  name: string;
  rolePermissions: RolePermission[];
  userCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = environment.apiUrl + '/Roles';

  constructor(private http: HttpClient) {}

  getAllRole(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(this.baseUrl);
  }

  // getRoleById(id: string): Observable<ApiResponse<Role>> {
  //   return this.http.get<ApiResponse<Role>>(`${this.baseUrl}/${id}`);
  // }

  getSearchKey(keyword: string): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(`${this.baseUrl}/search-key`, {
      params: { keyword }
    });
  }

  createRole(role: Partial<Role>): Observable<ApiResponse<Role>> {
    return this.http.post<ApiResponse<Role>>(this.baseUrl, role);
  }

  updateRole(id: string, role: Partial<Role>): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.baseUrl}/${id}`, role);
  }

  deleteRole(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  // assignPermissions(roleId: string, permissionIds: string[]): Observable<ApiResponse<any>> {
  //   return this.http.post<ApiResponse<any>>(`${this.baseUrl}/${roleId}/permissions`, permissionIds);
  // }

  moveUsers(oldRoleId: string, newRoleId: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/move-users`, {
      oldRoleId,
      newRoleId
    });
  }
}

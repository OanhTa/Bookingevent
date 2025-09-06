// permission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

export interface RolePermission {
  permissionId: string;
  permissionName: string;
  isGranted: boolean;

}

export interface Role {
  id: string;
  name: string;
  rolePermissions: RolePermission[],
  userCount: number;
}


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private  baseUrl = environment.apiUrl + '/Roles';
  constructor(private http: HttpClient) {}

  getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }
  getRoleById(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/${id}`);
  }

  createRole(role: Partial<Role>): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, role);
  }

  updateRole(id: string, role: Partial<Role>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, role);
  }

  deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  assignPermissions(roleId: string, permissionIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/${roleId}/permissions`, permissionIds);
  }
}

// permission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

export interface Permission {
  Id: string;
  Name: string;
  Description:string;
}

export interface RolePermission {
  permissionId: string;
  permissionName: string;
}

export interface UserPermission {
  id: string;
  name: string;
  description: string;
}

export interface PermissionTableItem {
  name: string;
  action: string;
  isGranted: string;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private  baseUrl = environment.apiUrl + '/Permissions';
  constructor(private http: HttpClient) {}

  getPermissions(): Observable<Permission[]> {
      return this.http.get<Permission[]>(this.baseUrl);
    }

  getRolePermissions(roleId: string): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${this.baseUrl}/RolePermissions/${roleId}`);
  }

  getUserPermissions(userId: string): Observable<UserPermission[]> {
    return this.http.get<UserPermission[]>(`${this.baseUrl}/UserPermissions/${userId}`);
  }

  updateUserPermissions(userId: string, permissionIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/UpdateUserPermissions/${userId}`, { permissionIds });
  }
}

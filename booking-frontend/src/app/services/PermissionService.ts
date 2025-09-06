// permission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

export interface Permission {
  id: string;
  name: string;
  description:string;
}

export interface CheckPermission {
  id: string;
  name: string;
  description: string;
  isGranted: boolean;
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

  getRolePermissions(roleId: string): Observable<CheckPermission[]> {
    return this.http.get<CheckPermission[]>(`${this.baseUrl}/RolePermissions/${roleId}`);
  }

  getUserPermissions(userId: string): Observable<CheckPermission[]> {
    return this.http.get<CheckPermission[]>(`${this.baseUrl}/UserPermissions/${userId}`);
  }

  grantUserPermissions(userId: string, permissionNames: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/grant-users?userId=${userId}`, permissionNames);
  }

  revokeUserPermissions(userId: string, permissionNames: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/revoke-users?userId=${userId}`, permissionNames);
  }

  grantRolePermissions(roleId: string, permissionNames: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/grant-roles?roleId=${roleId}`, permissionNames);
  }

  revokeRolePermissions(roleId: string, permissionNames: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/revoke-roles?roleId=${roleId}`, permissionNames);
  }

  updateUserPermissions(userId: string, permissionIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/UpdateUserPermissions/${userId}`, { permissionIds });
  }

  hasPermission(permission: string): boolean {
    try {
      if (typeof window === 'undefined') return false;
      const permsStr = localStorage.getItem('permissions');
      if (!permsStr) return false;

      const perms: { name: string; isGranted: boolean }[] = JSON.parse(permsStr);
      return perms.some(p => p.name === permission && p.isGranted);
    } catch (err) {
      console.error('Lỗi khi check quyền từ localStorage:', err);
      return false;
    }
  }

}

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { User } from "../models/UserDto";

@Injectable({
  providedIn: 'root'  
})
export class UserServices {
  private apiUrl = environment.apiUrl + '/Users';

  constructor(private httpClient: HttpClient) {}

  // Lấy danh sách user
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  // Lấy user theo Id
  getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }

  // Tạo mới user
  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }

  // Cập nhật user
  update(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${id}`, user);
  }

  SetPassword(id: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}/set-password`, data);
  }

  // Xóa user
  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  // Gán role cho user
  assignRole(userId: string, roleId: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/${userId}/assign-role/${roleId}`, {});
  }

  // Lấy roles của user
  getUserRoles(userId: string): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.apiUrl}/${userId}/roles`);
  }

  // Lấy permissions của user
  getUserPermissions(userId: string): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(`${this.apiUrl}/${userId}/permissions`);
  }

  // Update Token
  updateToken(request: UpdateTokenRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/update-token`, request);
  }
}

export class UpdateTokenRequest {
  accountId!: string;
  token!: string;
}

export class Role {
  id!: string;
  name!: string;
}

export class Permission {
  id!: string;
  name!: string;
  description!: string;
}

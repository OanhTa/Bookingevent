import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { User, UserFilter } from "../models/UserDto";

@Injectable({
  providedIn: 'root'  
})
export class UserServices {
  private apiUrl = environment.apiUrl + '/Users';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  getSearch(filters: UserFilter): Observable<UserFilter[]> {
    return this.httpClient.post<UserFilter[]>(`${this.apiUrl}/search`, filters);
  }

  getSearchKey(keyword: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/search-key`, {
      params: { keyword }
    });
  }

  getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }

  update(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${id}`, user);
  }

  SetPassword(id: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}/set-password`, data);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  assignRole(userId: string, roleId: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/${userId}/assign-role/${roleId}`, {});
  }

  getUserRoles(userId: string): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.apiUrl}/${userId}/roles`);
  }

  getUserPermissions(userId: string): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(`${this.apiUrl}/${userId}/permissions`);
  }

  updateToken(request: UpdateTokenRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/update-token`, request);
  }

  lockUser(userId: string, lockEnd: Date): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/lock/${userId}`, { lockEnd });
  }

  unlockUser(userId: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/unlock/${userId}`, {});
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

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { User, UserFilter } from "../models/UserDto";
import { ApiResponse } from "../models/ApiResponseDto";

@Injectable({
  providedIn: 'root'  
})
export class UserServices {
  private apiUrl = environment.apiUrl + '/Users';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ApiResponse<User[]>> {
    return this.httpClient.get<ApiResponse<User[]>>(this.apiUrl);
  }

  getSearch(filters: UserFilter): Observable<ApiResponse<User[]>> {
    return this.httpClient.post<ApiResponse<User[]>>(`${this.apiUrl}/search`, filters);
  }

  getSearchKey(keyword: string): Observable<ApiResponse<User[]>> {
    return this.httpClient.get<ApiResponse<User[]>>(`${this.apiUrl}/search-key`, {
      params: { keyword }
    });
  }

  getById(id: string): Observable<ApiResponse<User>> {
    return this.httpClient.get<ApiResponse<User>>(`${this.apiUrl}/${id}`);
  }

  create(user: User): Observable<ApiResponse<User>> {
    return this.httpClient.post<ApiResponse<User>>(this.apiUrl, user);
  }

  update(id: string, user: User): Observable<ApiResponse<User>> {
    return this.httpClient.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, user);
  }

  updateProfile(id: string, user: User): Observable<ApiResponse<User>> {
    return this.httpClient.put<ApiResponse<User>>(`${this.apiUrl}/profile/${id}`, user);
  }

  setPassword(id: string, data: any): Observable<ApiResponse<any>> {
    return this.httpClient.put<ApiResponse<any>>(`${this.apiUrl}/${id}/set-password`, data);
  }

  delete(id: string): Observable<ApiResponse<any>> {
    return this.httpClient.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  // assignRole(userId: string, roleId: string): Observable<ApiResponse<any>> {
  //   return this.httpClient.post<ApiResponse<any>>(`${this.apiUrl}/${userId}/assign-role/${roleId}`, {});
  // }

  // getUserRoles(userId: string): Observable<ApiResponse<Role[]>> {
  //   return this.httpClient.get<ApiResponse<Role[]>>(`${this.apiUrl}/${userId}/roles`);
  // }

  // getUserPermissions(userId: string): Observable<ApiResponse<Permission[]>> {
  //   return this.httpClient.get<ApiResponse<Permission[]>>(`${this.apiUrl}/${userId}/permissions`);
  // }

  // updateToken(request: UpdateTokenRequest): Observable<ApiResponse<any>> {
  //   return this.httpClient.post<ApiResponse<any>>(`${this.apiUrl}/update-token`, request);
  // }

  lockUser(userId: string, lockEnd: Date): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(`${this.apiUrl}/lock/${userId}`, { lockEnd });
  }

  // unlockUser(userId: string): Observable<ApiResponse<any>> {
  //   return this.httpClient.post<ApiResponse<any>>(`${this.apiUrl}/unlock/${userId}`, {});
  // }
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

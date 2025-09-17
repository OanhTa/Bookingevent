// src/app/services/audit-log.services.ts
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/ApiResponseDto";

export interface AuditLog {
  id?: string;
  userName?: string;
  applicationName?: string;
  httpMethod?: string;
  url?: string;
  clientIpAddress?: string;
  statusCode?: number;
  executionTime?: string;
  executionDuration?: number;
  hasException?: boolean;
  exceptionMessage?: string;
  action?: string;
  entity?: string;
  entityId?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditLogServices {
  private apiUrl = `${environment.apiUrl}/AuditLog`;

  constructor(private httpClient: HttpClient) {}

  getAll(page: number, pageSize: number): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(
      `${this.apiUrl}?page=${page}&pageSize=${pageSize}`
    );
  }

  getSearch(audit: Partial<AuditLog>, page: number, pageSize: number): Observable<ApiResponse<AuditLog[]>> {
    return this.httpClient.post<ApiResponse<AuditLog[]>>(`${this.apiUrl}/search?page=${page}&pageSize=${pageSize}`, audit);
  }

  // getById(id: string): Observable<ApiResponse<AuditLog>> {
  //   return this.httpClient.get<ApiResponse<AuditLog>>(`${this.apiUrl}/${id}`);
  // }

  // add(auditLog: AuditLog): Observable<ApiResponse<AuditLog>> {
  //   return this.httpClient.post<ApiResponse<AuditLog>>(this.apiUrl, auditLog);
  // }

  // delete(id: string): Observable<ApiResponse<void>> {
  //   return this.httpClient.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  // }
}

// src/app/services/audit-log.services.ts
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";

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

  getAll(): Observable<AuditLog[]> {
    return this.httpClient.get<AuditLog[]>(`${this.apiUrl}`);
  }

  getSearch(audit: AuditLog): Observable<AuditLog[]> {
    return this.httpClient.post<AuditLog[]>(`${this.apiUrl}/search`, audit);
  }

  getById(id: string): Observable<AuditLog> {
    return this.httpClient.get<AuditLog>(`${this.apiUrl}/${id}`);
  }

  add(auditLog: AuditLog): Observable<AuditLog> {
    return this.httpClient.post<AuditLog>(`${this.apiUrl}`, auditLog);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}

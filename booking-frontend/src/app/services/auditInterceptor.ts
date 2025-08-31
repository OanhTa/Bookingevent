// src/app/interceptors/audit.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuditLog, AuditLogServices } from './AuditLogServices';
import { tap } from 'rxjs/operators';

export const auditInterceptor: HttpInterceptorFn = (req, next) => {
  const auditService = inject(AuditLogServices);

  // tránh log vòng lặp chính request AuditLog
  if (req.url.includes('/AuditLog')) {
    return next(req);
  }
  const account =''// localStorage.getItem('account.name') || 'Unknown';;

  return next(req).pipe(
    tap({
      next: () => {
        const audit: AuditLog = {
          id: crypto.randomUUID(), // hoặc để backend tự gen
          action: req.method,
          entity: extractEntityFromUrl(req.url), // helper function tách entity
          entityId: extractEntityIdFromUrl(req.url), // helper function nếu có
          performedBy: account,
          timestamp: new Date().toISOString(),
          description: `Thao tác ${req.method} đến ${req.url}`
        };

        auditService.add(audit).subscribe({
          error: (err) => console.error('Audit log failed:', err)
        });
      },
      error: (err) => {
        const auditLog: AuditLog = {
            id: crypto.randomUUID(), // nếu BE gen thì có thể bỏ
            action: req.method,
            entity: extractEntityFromUrl(req.url),
            entityId: extractEntityIdFromUrl(req.url),
            performedBy: account,
            timestamp: new Date().toISOString(),
            description: `Error ${err.message} when calling ${req.url}`
        };

        auditService.add(auditLog).subscribe({
          error: (e) => console.error('Audit log failed:', e)
        });
      }
    })
  );
};

function extractEntityFromUrl(url: string): string {
  const parts = url.split('/');
  return parts.length > 0 ? parts[parts.length - 2] : '';
}

function extractEntityIdFromUrl(url: string): string {
  const parts = url.split('/');
  const last = parts[parts.length - 1];
  return /^\d+$/.test(last) || /^[0-9a-fA-F-]{36}$/.test(last) ? last : '';
}
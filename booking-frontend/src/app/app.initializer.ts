// src/app/app.initializer.ts
import { APP_INITIALIZER, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PermissionService } from './services/PermissionService';

export function appConfigFactory() {
  const http = inject(HttpClient);
  const permissionService = inject(PermissionService);

  return () => {
    // Chỉ chạy trên trình duyệt
    if (typeof window === 'undefined') {
      return Promise.resolve(true);
    }

    try {
      const accountStr = localStorage.getItem('account');
      if (!accountStr) return Promise.resolve(true);

      const account = JSON.parse(accountStr);

      return permissionService.getUserPermissions(account.userId)
        .toPromise()
        .then(perms => {
          localStorage.setItem('permissions', JSON.stringify(perms));
        })
        .catch(err => {
          localStorage.removeItem('permissions');
        });
    } catch (err) {
      console.error('Lỗi trong initializer:', err);
      return Promise.resolve(true);
    }
  };
}

export const APP_INIT_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appConfigFactory,
    deps: [PermissionService],
    multi: true
  }
];

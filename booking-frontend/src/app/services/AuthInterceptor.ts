// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  try {
    const accountStr = localStorage.getItem('account');
    if (accountStr) {
      const account = JSON.parse(accountStr);
      const token = account.token; 

      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } else {
      console.log('Không tìm thấy account trong localStorage');
    }
  } catch (err) {
    console.warn('Không thể lấy token từ localStorage:', err);
  }

  return next(req);
};

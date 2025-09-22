import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  try {
    // ✅ Kiểm tra đang chạy ở browser mới dùng localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const accountStr = localStorage.getItem('account');
      if (accountStr) {
        const account = JSON.parse(accountStr);
        const token = account.token;

        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      } else {
        console.log('Không tìm thấy account trong localStorage');
      }
    } else {
      console.log('SSR mode: localStorage không khả dụng');
    }
  } catch (err) {
    console.warn('Không thể lấy token từ localStorage:', err);
  }

  return next(req);
};

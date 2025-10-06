import { isPlatformBrowser } from '@angular/common';

/**
 * Hàm kiểm tra trạng thái đăng nhập từ localStorage
 * @param platformId - Để kiểm tra có đang chạy trên trình duyệt không
 * @returns { isLoggedIn: boolean, user: any }
 */
export function checkLogin(platformId: Object): { isLoggedIn: boolean; user: any } {
  let isLoggedIn = false;
  let user: any = {};

  if (isPlatformBrowser(platformId)) {
    const accountStr = localStorage.getItem('account');

    if (accountStr) {
      try {
        const accountObj = JSON.parse(accountStr);
        if (accountObj.userId && accountObj.userId !== '') {
          user = accountObj;
          isLoggedIn = true;
        }
      } catch (e) {
        console.error('Lỗi parse JSON account:', e);
      }
    }
  }

  return { isLoggedIn, user };
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    try {
      const accountStr = localStorage.getItem('account');
      if (!accountStr) {
        this.router.navigate(['/login']);
        return false;
      }

      const account = JSON.parse(accountStr);
      const expectedRole = route.data['role'] as string;

      if (account?.roles?.includes(expectedRole)) {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    } catch (error) {
      console.error('AuthGuard error:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}

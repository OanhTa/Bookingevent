import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (!isPlatformBrowser(this.platformId)) {
      return this.router.parseUrl('/login');
    }

    try {
      const accountStr = localStorage.getItem('account');
      if (!accountStr) {
        return this.router.parseUrl('/login');
      }

      const account = JSON.parse(accountStr);
      const expectedRole = route.data['role'] as string;

      if (account?.roles?.includes(expectedRole)) {
        return true;
      }

      const allowDirect = route.data['allowDirect'];
      if (allowDirect) {
        // dùng signal currentNavigation
        const navigation = this.router.currentNavigation();
        if (!navigation?.previousNavigation) {
          return this.router.parseUrl('/');
        }
      }

      return this.router.parseUrl('/');

    } catch (error) {
      return this.router.parseUrl('/login');
    }
  }
}

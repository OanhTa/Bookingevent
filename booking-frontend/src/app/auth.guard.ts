import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const account = JSON.parse(localStorage.getItem('account')!);
    if (!account) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedGroup = route.data['accountGroup'] as string;
    if (account.accountGroup.name === expectedGroup) return true;

    this.router.navigate(['/']);
    return false;
  }
}

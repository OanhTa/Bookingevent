// src/app/services/account.service.ts
import { Injectable } from '@angular/core';
import { CheckPermission } from './PermissionService';

@Injectable({
  providedIn: 'root'  // => singleton, toàn app đều dùng chung
})
export class AccountService {
  private accountInfo: any | null = null;
  private permissions:  any[] = [];

  setAccount(account: any) {
    this.accountInfo = account;
  }

  getAccount(): any | null {
    return this.accountInfo;
  }

  clearAccount() {
    this.accountInfo = null;
    this.permissions = [];
  }

  setPermissions(perms: any[]) {
    this.permissions = perms;
  }

  getPermissions(): any[] {
    return this.permissions;
  }

}

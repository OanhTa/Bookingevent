import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class UserInfoService {
  private user: any | null = null; 

  getUser(): any | null {
    return this.user;
  }

  setUser(user: any): void {
    this.user = user;
  }

  clearUser(): void {
    this.user = null;
  }
}

import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-sidebar-right',
  standalone: true,
  templateUrl: './sidebar-right.html',
  imports:[
    Popover,ButtonModule,
    CommonModule,RouterModule,
    Dialog
  ]
})
export class SidebarRight{
  user: any;
  showRoleModal = false;
  constructor(
    private router: Router
  ) {
    const accountStr = localStorage.getItem('account');
    const account = accountStr ? JSON.parse(accountStr) : {};

    this.user = {
      name: account?.userName || '',
      fullName: account?.fullName || '',
      email: account?.email || '',
      avatarUrl: account?.avatarUrl || '',
      roles: account?.roles,
      selectedRole: 'Admin'
    };
  }

  switchRole(role: string) {
    this.user.selectedRole = role;
    this.showRoleModal = false;
  }


  onSignOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

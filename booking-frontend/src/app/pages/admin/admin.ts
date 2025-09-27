import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SidebarRight } from './sidebar-right/sidebar-right';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    SidebarRight
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin{
  menuItems = [
    { link: '/admin/dashbord', icon: 'pi pi-chart-line', label: 'Tổng quan' },
    { link: '/admin/users', icon: 'pi pi-users', label: 'Quản lý người dùng' },
    { link: '/admin/roles', icon: 'pi pi-lock', label: 'Quản lý quyền' },
    { link: '/admin/audit-log', icon: 'pi pi-file', label: 'Nhật ký hệ thống' },
    { link: '/admin/settings', icon: 'pi pi-cog', label: 'Cài đặt' }
  ];

}

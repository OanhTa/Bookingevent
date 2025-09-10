import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Popover } from 'primeng/popover';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-right',
  standalone: true,
  templateUrl: './sidebar-right.html',
  imports:[
    Popover,ButtonModule,CommonModule,RouterModule
  ]
})
export class SidebarRight{
   user = {
    name: 'Oanh Ta',
    email: 'oanh@gmail.com',
    avatarUrl: 'https://primefaces.org/cdn/primeng/images/demo/avatar/1.png',
    roles: ['Admin', 'Editor', 'Viewer'],
    selectedRole: 'Admin'
  };
}

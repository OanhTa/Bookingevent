import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    RouterModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
    @Input() showHeaderEnd: boolean = true;
    items: any[] = [
    {
      label: 'My Home',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Explore Event',
      icon: 'pi pi-info-circle',
      routerLink: '/about'
    },
    {
      label: 'CreateEvent',
      icon: 'pi pi-envelope',
      routerLink: '/contact'
    }
  ];
}
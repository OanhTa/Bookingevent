import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';
import { OrganisationMenuComponent } from './menu-origin/organisation-menu';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    ButtonModule,
    RouterModule,
    OrganisationMenuComponent
  ],
  templateUrl: './header.html',
})
export class Header {
  @Input() showHeaderEnd: boolean = true;
  @Input() user: any = {};

  items: any[] = [
    {
      label: 'Trang chủ',
      icon: 'pi pi-arrow-right-arrow-left',
      routerLink: '/'
    },
    // {
    //   label: 'Khám phá',
    //   icon: 'pi pi-sync',
    //   routerLink: '/about'
    // },
  ];
  isOpen = false;
  showOrgMenu = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.user = JSON.parse(localStorage.getItem('account') || '{}');
    }
  }

  toggleOrgMenu() {
    this.showOrgMenu = !this.showOrgMenu;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }

  onSignOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
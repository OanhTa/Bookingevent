import { Component, ElementRef, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';
import { OrganisationMenuComponent } from './menu-origin/organisation-menu';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    RouterModule,
    OrganisationMenuComponent
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
    @Input() showHeaderEnd: boolean = true;
    @Input() user: any = {};

    items: any[] = [
        {
          label: 'Trang chủ',
          icon: 'pi pi-home',
          routerLink: '/'
        },
        {
          label: 'Giới thiệu',
          icon: 'pi pi-info-circle',
          routerLink: '/about'
        },
        {
          label: 'Liên hệ',
          icon: 'pi pi-envelope',
          routerLink: '/contact'
        }
      ];
  isOpen = false;
  showOrgMenu = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef<HTMLElement>,
    private router: Router
  ) {
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.el.nativeElement.contains(event.target as Node);
    if (!clickedInside) this.close();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event) {
    this.close();
  }


  onSignOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
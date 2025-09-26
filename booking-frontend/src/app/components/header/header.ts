import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';
import { OrganisationMenuComponent } from './menu-origin/organisation-menu';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from '../../services/NotificationService';
import { PopoverModule } from 'primeng/popover';


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
    PopoverModule,
    OrganisationMenuComponent
  ],
  templateUrl: './header.html',
})
export class Header implements OnInit{
  @Input() showHeaderEnd: boolean = true;
  @Input() user: any = {};

  unreadCount = 0;
  notifications: any[] = [];
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
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.user = JSON.parse(localStorage.getItem('account') || '{}');
    }
  }
  ngOnInit(): void {
    if (this.user && this.user.userId) {
      this.loadNotifications(this.user.userId);
    }
  }

  loadNotifications(userId: string) {
    this.notificationService.getMyNotifications(userId).subscribe((res:any) => {
      this.notifications = res;
      this.unreadCount = res.filter((n:any) => !n.isRead).length;
    });
  }

  markAsRead(notification: any) {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification.notificationId, this.user.userId).subscribe({
        next: () => {
          notification.isRead = true;
          this.unreadCount = this.notifications.filter(n => !n.isRead).length;
        },
        error: (err) => {}
      });
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
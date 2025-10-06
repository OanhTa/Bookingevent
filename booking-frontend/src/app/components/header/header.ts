import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule, Router } from '@angular/router';
import { AuthServices } from '../../services/AuthServices';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    RouterModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Input() showHeaderEnd: boolean = true;
  @Input() user: any = {};

  // Menu items mặc định
  items: any[] = [
    { label: 'Trang chủ', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Giới thiệu', icon: 'pi pi-info-circle', routerLink: '/about' },
    { label: 'Liên hệ', icon: 'pi pi-envelope', routerLink: '/contact' }
  ];

  isOpen = false;        // trạng thái dropdown avatar
  showOrgMenu = false;   // trạng thái menu tổ chức
  mobileOpen: boolean = false; // mobile menu toggle
  isLoggedIn: boolean = false; // trạng thái đăng nhập

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef<HTMLElement>,
    private router: Router,
    private authService:AuthServices
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // kiểm tra user từ localStorage
      const accountStr = localStorage.getItem('account');

      if (accountStr) {
        try {
          const accountObj = JSON.parse(accountStr);

          //  Kiểm tra thật sự có thông tin quan trọng, ví dụ userId hoặc token
          if (accountObj.userId && accountObj.userId !== '') {
            this.user = accountObj;    // hợp lệ → set user
            this.isLoggedIn = true;    // bật trạng thái đăng nhập
          } else {
            this.user = {};            // không hợp lệ → reset user
            this.isLoggedIn = false;   // chưa đăng nhập
          }
        } catch (e) {
          // Nếu JSON sai → reset
          this.user = {};
          this.isLoggedIn = false;
        }
      } else {
        // localStorage không có account → chưa đăng nhập
        this.user = {};
        this.isLoggedIn = false;
      }

    }
  }

  // Toggle menu tổ chức
  toggleOrgMenu() {
    this.showOrgMenu = !this.showOrgMenu;
  }
 
  // Toggle dropdown avatar
  toggle() {
    this.isOpen = !this.isOpen;
  }

  // Đóng dropdown
  close() {
    this.isOpen = false;
  }

  // Đóng dropdown khi click ngoài
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.el.nativeElement.contains(event.target as Node);
    if (!clickedInside) this.close();
  }

  // Đóng dropdown khi nhấn ESC
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event) {
    this.close();
  }

  // Đăng xuất
  onSignOut() {
    localStorage.clear();
    this.isLoggedIn = false; // reset trạng thái
    this.user = null;          // clear user info
    this.router.navigate(['/home']);
  }

   ngOnInit(): void {
    this.checkLoginStatus();
  }

  //  Hàm kiểm tra trạng thái đăng nhập
  checkLoginStatus() {
    const current = this.authService.currentUserValue;
    this.user = current;
    // console.log(' User hiện tại:', this.user);
  }
  
}

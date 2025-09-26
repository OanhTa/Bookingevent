import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthServices } from '../../services/AuthServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-login',
  imports: [CommonModule],
  templateUrl: './check-login.html',
  styleUrl: './check-login.css'
})
export class CheckLogin implements OnInit {
   @Input() user: any = {};
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
      // ✅ kiểm tra user từ localStorage
      const accountStr = localStorage.getItem('account');

      if (accountStr) {
        try {
          const accountObj = JSON.parse(accountStr);

          // ✅ Kiểm tra thật sự có thông tin quan trọng, ví dụ userId hoặc token
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
  checkLoginStatus() {
    const current = this.authService.currentUserValue;
    this.user = current;
    // console.log(' User hiện tại:', this.user);
  }
  ngOnInit(): void {
    this.checkLoginStatus();
  }
  

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuProfile } from "../../components/menu-profile/menu-profile";
import { Header } from "../../components/header/header";
import { CheckoutService } from '../../services/CheckoutService';
import { CheckoutDto } from '../../models/CheckoutDto';
import { AuthServices } from '../../services/AuthServices';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [MenuProfile, Header, CommonModule],
  templateUrl: './purchase-order.html',
  styleUrl: './purchase-order.css'
})
export class PurchaseOrder implements OnInit {

  order: CheckoutDto[] = [];
  userId: string = '';
  user: any = null;

  constructor(
    private checkoutService: CheckoutService,
    private cdr: ChangeDetectorRef,
    private auth: AuthServices
  ) {}

  ngOnInit(): void {
    this.checkLoginAndLoadOrders();
  }

  // Kiểm tra đăng nhập & load đơn hàng
  checkLoginAndLoadOrders(): void {
    if (typeof window === 'undefined') return; // SSR-safe

    this.user = this.auth.getCurrentUser();
    if (this.user && this.user.userId) {
      this.userId = this.user.userId;
      this.loadPurchaseOrder();
    } else {
      console.warn('Bạn chưa đăng nhập, không thể tải lịch sử mua hàng.');
    }
  }

  // Gọi API load đơn hàng theo userId
  loadPurchaseOrder(): void {
    if (!this.userId) return;

    this.checkoutService.getOrdersByUser(this.userId).subscribe({
      next: (data) => {
        this.order = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Lỗi khi load lịch sử mua hàng:', err)
    });
  }
}

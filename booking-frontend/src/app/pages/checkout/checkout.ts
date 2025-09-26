import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/EventService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { CheckoutDto } from '../../models/CheckoutDto';
import { AuthServices } from '../../services/AuthServices';
import { CheckoutService } from '../../services/CheckoutService';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, Header],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout implements OnInit {

  eventDetail: any;

  // Form data
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    coupon: ''
  };

  ticketCount: number = 1; // số lượng vé mặc định
  previousTicketCount: number = 1; // lưu giá trị hợp lệ trước đó
  totalPrice: number = 0; // tổng tiền

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private checkoutService: CheckoutService, // service gọi API
    private authService: AuthServices,         // để lấy userId nếu có
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      if (eventId) {
        this.eventService.getEventById(eventId).subscribe(event => {
          this.eventDetail = event;
          this.updateTotal(); // tính tổng tiền khi load sự kiện
          this.cdr.detectChanges();
        });
      }
    });
  }

  onTicketChange() {
    if (this.ticketCount < 1 || isNaN(this.ticketCount)) {
      this.ticketCount = 1;
    }
    this.updateTotal();
  }

  onTicketInput(event: any) {
    const value = event.target.value;

    if (value === '') {
      this.ticketCount = 0;
      this.previousTicketCount = 0;
    } else if (/^[0-9]+$/.test(value)) {
      this.ticketCount = parseInt(value);
      this.previousTicketCount = this.ticketCount;
    } else {
      event.target.value = this.previousTicketCount;
      this.ticketCount = this.previousTicketCount;
    }

    this.updateTotal();
  }

  increaseTicket() {
    this.ticketCount++;
    this.previousTicketCount = this.ticketCount;
    this.updateTotal();
  }

  decreaseTicket() {
    if (this.ticketCount > 0) {
      this.ticketCount--;
      this.previousTicketCount = this.ticketCount;
      this.updateTotal();
    }
  }

  updateTotal() {
    if (this.eventDetail && this.ticketCount > 0) {
      this.totalPrice = this.eventDetail.priceFrom * this.ticketCount;
    } else {
      this.totalPrice = 0;
    }
  }

  applyCoupon() {
    console.log('Coupon applied:', this.formData.coupon);
  }

  confirmPayment() {
    // Lấy userId từ AuthService nếu có
    const currentUser = this.authService.currentUserValue;

    const payload: CheckoutDto = {
      // userId: currentUser?.id,
      eventId: this.eventDetail.id,
      ho: this.formData.firstName,
      ten: this.formData.lastName,
      email: this.formData.email,
      address: this.formData.address,
      quocGia: this.formData.country,
      thanhpho: this.formData.city,
      zip: this.formData.zip,
      soThe: this.formData.cardNumber,
      ngayHetHan: this.formData.expiry,
      cvv: this.formData.cvv,
      maGiamGia: this.formData.coupon,
      soLuong: this.ticketCount,
      tongTien: this.totalPrice
    };

    console.log('Sending to API:', payload);

    // Gọi API qua CheckoutService
    this.checkoutService.checkout(payload).subscribe({
      next: res => {
        console.log('Thanh toán thành công', res);
        this.router.navigate(['/checkout-success']);
      },
      error: err => {
        console.error('Thanh toán thất bại', err);
      }
    });
  }
}

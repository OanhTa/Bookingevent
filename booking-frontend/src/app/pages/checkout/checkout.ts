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
    diachi: '',
    country: '',
    state: '',
    city: '',
    maZip: '',
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
  //  Bước 1: Kiểm tra validate trước
  if (
    !this.formData.firstName ||
    !this.formData.lastName ||
    !this.formData.email ||
    !this.formData.diachi ||
    !this.formData.country ||
    !this.formData.city ||
    !this.formData.maZip ||
    !this.formData.cardNumber ||
    !this.formData.expiry ||
    !this.formData.cvv ||
    this.ticketCount <= 0
  ) {
    console.warn(' Thiếu thông tin! Vui lòng kiểm tra lại form.');
    alert('Vui lòng điền đầy đủ thông tin thanh toán!');
    return; //  Dừng lại, không gửi API
  }

  //  Bước 2: Lấy thông tin người dùng
  const user = this.authService.currentUserValue;
  const userId = user?.userId || '';

  //  Bước 3: Tạo payload
  const payload: CheckoutDto = {
    event_Id: this.eventDetail.id,
    user_Id: userId,
    ho: this.formData.firstName,
    ten: this.formData.lastName,
    email: this.formData.email,
    diachi: this.formData.diachi,
    quocGia: this.formData.country,
    thanhpho: this.formData.city,
    maZip: this.formData.maZip,
    soThe: this.formData.cardNumber,
    ngay_HetHan: this.formData.expiry,
    cvv: this.formData.cvv,
    ma_Giam_Gia: this.formData.coupon,
    so_Luong: this.ticketCount,
    tong_Tien: this.totalPrice
  };

  console.log('Dữ liệu gửi lên API:', payload);

  //  Bước 4: Gọi API
  this.checkoutService.createCheckout(payload).subscribe({
    next: res => {
      console.log(' Thanh toán thành công:', res);
      this.router.navigate(['/checkout-success']);
    },
    error: err => {
      console.error(' Thanh toán thất bại:', err);
      alert('Thanh toán thất bại! Vui lòng thử lại sau.');
    }
  });
}

  validateForm(): boolean {
  // Kiểm tra các trường bắt buộc
  if (!this.formData.firstName || !this.formData.lastName || !this.formData.email ||
      !this.formData.diachi || !this.formData.country || !this.formData.city ||
      !this.formData.maZip || !this.formData.cardNumber || !this.formData.expiry ||
      !this.formData.cvv) {
    alert(' Vui lòng điền đầy đủ thông tin bắt buộc!');
    return false;
  }

  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.formData.email)) {
    alert(' Email không hợp lệ!');
    return false;
  }

  // Kiểm tra số thẻ (ít nhất 12 số)
  const cardRegex = /^[0-9]{12,19}$/;
  if (!cardRegex.test(this.formData.cardNumber.replace(/\D/g, ''))) {
    alert(' Số thẻ không hợp lệ!');
    return false;
  }

  // Kiểm tra hạn thẻ
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(this.formData.expiry)) {
    alert(' Ngày hết hạn phải đúng định dạng MM/YY!');
    return false;
  }

  // CVV phải là 3 số
  const cvvRegex = /^[0-9]{3}$/;
  if (!cvvRegex.test(this.formData.cvv)) {
    alert(' CVV phải là 3 số!');
    return false;
  }

  // Kiểm tra số lượng vé
  if (this.ticketCount <= 0) {
    alert(' Vui lòng chọn ít nhất 1 vé!');
    return false;
  }

  return true;
}


}

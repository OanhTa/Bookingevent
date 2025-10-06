import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../environments/environments';
import { CheckoutDto } from '../models/CheckoutDto';
import { Checkout } from '../pages/checkout/checkout';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl = `${environment.apiUrl}/checkout`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /**
   * Lấy tất cả đơn hàng (chỉ dùng trong admin)
   */
  getAll(): Observable<Checkout[]> {
    return this.http.get<Checkout[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error(' Lỗi khi gọi getAll đơn hàng:', err);
        return of([]);
      })
    );
  }

  /**
   * Tạo đơn hàng mới (POST api/checkout)
   */
  createCheckout(payload: CheckoutDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload).pipe(
      catchError(err => {
        console.error(' Lỗi khi tạo checkout:', err);
        return of(null);
      })
    );
  }

  /**
   * Lấy chi tiết đơn hàng theo ID
   */
  getCheckoutById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error(` Lỗi khi lấy đơn hàng ID=${id}:`, err);
        return of(null);
      })
    );
  }

  /**
   * Lấy danh sách đơn hàng theo userId
   */
  getOrdersByUser(userId: string): Observable<CheckoutDto[]> {
    if (!userId) {
      console.warn(' userId rỗng, không gọi API');
      return of([]);
    }
    return this.http.get<CheckoutDto[]>(`${this.apiUrl}/by-user/${userId}`).pipe(
      catchError(err => {
        console.error(` Lỗi khi load đơn hàng theo userId=${userId}:`, err);
        return of([]);
      })
    );
  }

  /**
   * Hàm checkout gọi createCheckout
   */
  checkout(payload: CheckoutDto): Observable<any> {
    return this.createCheckout(payload);
  }
}

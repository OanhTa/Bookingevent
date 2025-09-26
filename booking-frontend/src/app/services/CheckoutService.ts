import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { CheckoutDto } from '../models/CheckoutDto';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl = `${environment.apiUrl}/checkout`; // trùng với backend route

  constructor(private http: HttpClient) { }

  /**
   * Tạo đơn hàng mới (POST api/checkout)
   * Dữ liệu được lưu vào DB backend
   */
  createCheckout(payload: CheckoutDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  /**
   * Lấy chi tiết đơn hàng theo id (GET api/checkout/{id})
   */
  getCheckoutById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Hàm này vẫn có thể dùng trực tiếp khi cần gọi "checkout" đơn
   */
  checkout(payload: CheckoutDto): Observable<any> {
    return this.createCheckout(payload); // gọi createCheckout để lưu DB
  }
}

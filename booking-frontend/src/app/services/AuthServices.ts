import { HttpClient } from "@angular/common/http";
import { of, Observable, BehaviorSubject } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { LoginResponseDto } from "../models/LoginResponseDto";
import { LoginRequestDto } from "../models/LoginRequestDto";
import { RegisterRequest, RegisterResponse } from "../models/RegisterDto";
import { RequestPasswordResetDto, ResetPasswordDto } from "../models/UserDto";
import { ApiResponse } from "../models/ApiResponseDto";
import { tap, catchError } from 'rxjs/operators';

// Định nghĩa interface cho đổi mật khẩu
export interface ChangePasswordDto {
  passwordCurrent: string,
  passwordNew: string
}

//Định nghĩa interface User (sửa lại userId thành string)
export interface User {
  userId: string;   // GUID dạng chuỗi
  ho: string;
  ten: string;
  email: string;
  token?: string;
  // thêm các trường khác nếu cần
}

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  private apiUrl = environment.apiUrl + '/Auth';

  // BehaviorSubject lưu thông tin user hiện tại
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private httpClient: HttpClient) {
    let savedUser: User | null = null;

    // ✅ Check để tránh lỗi SSR
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('account');
      if (saved) {
        try {
          savedUser = JSON.parse(saved);
        } catch {
          savedUser = null;
        }
      }
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(savedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Lấy user hiện tại từ API (nếu backend hỗ trợ)
  private fetchCurrentUserFromApi(): Observable<User | null> {
    return this.httpClient.get<User>(`${this.apiUrl}/me`).pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(err => {
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  }

  // Getter truy cập giá trị hiện tại
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Login
  login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
    return this.httpClient.post<LoginResponseDto>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((res: LoginResponseDto) => {
        const user: User = {
          userId: res.userId,
          email: res.email,
          token: res.token,
          ho: res.ho || "",
          ten: res.ten || ""
        };
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          localStorage.setItem('account', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      })
    );
  }

  // Register
  register(registerRequest: RegisterRequest): Observable<ApiResponse<RegisterResponse>> {
    return this.httpClient.post<ApiResponse<RegisterResponse>>(`${this.apiUrl}/register`, registerRequest);
  }

  // Change password
  changePassword(userId: string, dto: ChangePasswordDto): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(`${this.apiUrl}/change-password?userId=${userId}`, dto);
  }

  // Request password reset
  requestPasswordReset(dto: RequestPasswordResetDto): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/request-password-reset`, dto);
  }

  // Reset password
  resetPassword(dto: ResetPasswordDto): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/reset-password`, dto);
  }

  // Confirm email
  confirmEmail(token: string) {
    return this.httpClient.get(`${this.apiUrl}/confirm-email?token=${token}`);
  }

  // Ghi nhận user khi login thành công
  setCurrentUser(user: User) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('account', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  // Logout
  logout() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('account');
    }
    this.currentUserSubject.next(null);
  }

  // Kiểm tra đã đăng nhập hay chưa
  isLoggedIn(): boolean {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return false;

    const userJson = localStorage.getItem('account');
    console.log(' userJson:', userJson);

    if (!userJson) return false;

    const user = JSON.parse(userJson);
    console.log(' userId:', user?.userId, 'token:', user?.token);

    const hasUserId = !!user?.userId;
    const hasToken = !!user?.token;
    console.log(' hasUserId:', hasUserId, 'hasToken:', hasToken);

    return hasUserId && hasToken;
  }

  // Hàm load user từ localStorage
  loadCurrentUser(): User | null {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return null;
    try {
      const accountStr = localStorage.getItem('account');
      if (accountStr) {
        const accountObj = JSON.parse(accountStr);
        if (accountObj.userId && accountObj.userId !== '') {
          this.setCurrentUser(accountObj);
          return accountObj;
        }
      }
    } catch (e) {
      console.warn('Lỗi khi parse user từ localStorage:', e);
    }
    this.logout();
    return null;
  }

  // Hàm public để component gọi
  getCurrentUser(): User | null {
    const current = this.currentUserSubject.value;
    if (current && current.userId) return current; 
    return this.loadCurrentUser();
  }
}

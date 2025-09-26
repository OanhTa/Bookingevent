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

// Định nghĩa interface User
export interface User {
    UserId: number;
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

    if (typeof window !== 'undefined') {
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

    


    // Ví dụ fetch user từ backend
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
        // Giả sử backend trả về: { userId, email, token }
        const user: User = {
            UserId: Number(res.userId),
            email: res.email,
            token: res.token,
            ho: "",
            ten: ""
        };
        localStorage.setItem('account', JSON.stringify(user));
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
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
    }

    // Logout
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    // Kiểm tra đăng nhập
    isLoggedIn(): boolean {
        if (typeof window === 'undefined') return false; // tránh lỗi khi SSR

        const userJson = localStorage.getItem('currentUser');
        if (!userJson) return false; // chưa lưu user nào

        const user = JSON.parse(userJson);

        // Có userId và token (nếu bạn dùng token riêng) thì xem là đã login
        const hasUserId = !!user?.UserId || !!user?.userId;
        const token = localStorage.getItem('account'); // nếu bạn lưu token riêng

        return hasUserId && !!token; // true nếu có cả userId và token
    }

}

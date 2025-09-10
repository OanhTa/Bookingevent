import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { LoginResponseDto } from "../models/LoginResponseDto";
import { LoginRequestDto } from "../models/LoginRequestDto";
import { RegisterRequest, RegisterResponse } from "../models/RegisterDto";
import { RequestPasswordResetDto, ResetPasswordDto } from "../models/UserDto";

@Injectable({
  providedIn: 'root'  
})

export class AuthServices{
    private  apiUrl = environment.apiUrl + '/Auth';
    constructor(private httpClient:HttpClient) { 

    }
    login(loginRequest: LoginRequestDto) : Observable<LoginResponseDto>{
        return this.httpClient.post<LoginResponseDto>(`${this.apiUrl}/login`, loginRequest)
    }
    register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
        return this.httpClient.post<RegisterResponse>(`${this.apiUrl}/register`, registerRequest);
    }

    requestPasswordReset(dto: RequestPasswordResetDto): Observable<any> {
        return this.httpClient.post<any>(`${this.apiUrl}/request-password-reset`, dto);
    }

    resetPassword(dto: ResetPasswordDto): Observable<any> {
        return this.httpClient.post<any>(`${this.apiUrl}/reset-password`, dto);
    }
}

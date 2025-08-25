import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";
import { UpdateTokenRequest } from "./AccountServices";

@Injectable({
  providedIn: 'root'  
})

export class AuthServices{
    private  apiUrl = environment.apiUrl + '/Auth';
    constructor(private httpClient:HttpClient) { 

    }
    login(loginRequest: LoginRequest) : Observable<UpdateTokenRequest>{
        return this.httpClient.post<UpdateTokenRequest>(`${this.apiUrl}/login`, loginRequest)
    }
}
export class LoginRequest{
    email!:string;
    password!:string;
}

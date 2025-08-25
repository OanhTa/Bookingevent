import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'  
})

export class AccountServices{
    private  apiUrl = environment.apiUrl + '/Account';
    constructor(private httpClient:HttpClient) { 

    }
    getAll():Observable<Account[]>{
        return this.httpClient.get<Account[]>(this.apiUrl).pipe(
    )}
    updateToken(request : UpdateTokenRequest) : Observable<any>{
        return this.httpClient.post<any>(`${this.apiUrl}/update-token`, request)
    }
}
export class Account{
    id!:number;
    name!:string;
    passHash!: number;
    email!:string;
    phone!: number;
    address!: string;
    ccountGroupId!: string;
}
export class UpdateTokenRequest{
    accountId!:string;
    token!:string;
}

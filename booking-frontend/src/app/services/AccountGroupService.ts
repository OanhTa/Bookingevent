import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'  
})

export class AccountGroupServices{
    private  apiUrl = environment.apiUrl + '/AccountGroup';
    constructor(private httpClient:HttpClient) { 

    }
    getAll():Observable<AccountGroup[]>{
        return this.httpClient.get<AccountGroup[]>(`${this.apiUrl}/getAll`);
    }
    addAccountGroup(accountGroup: AccountGroup): Observable<AccountGroup> {
        return this.httpClient.post<AccountGroup>(this.apiUrl, accountGroup);
    }

}
export class AccountGroup{
    id!: string;
    name!:string;
    enable!: string;
    note!: boolean;
}

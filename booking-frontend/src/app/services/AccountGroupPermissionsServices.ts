import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'  
})
export class AccountGroupPermissionsServices{
    private  apiUrl = environment.apiUrl + '/AccountGroupPermissions';
    constructor(private httpClient:HttpClient) { 

    }
    getByAccountGroup(groupId: string):Observable<Permissions[]>{
        return this.httpClient.get<Permissions[]>(`${this.apiUrl}/${groupId}`);
    }
    addAccountPermissions(permission: Permissions[]): Observable<Permissions> {
        return this.httpClient.post<Permissions>(this.apiUrl, permission);
    }

}
export class Permissions{
    AccountGroupId!: string;
    FormName!:string;
    Action!: string;
    AllowAction!: boolean;
}

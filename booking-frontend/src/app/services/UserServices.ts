import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";

export class UserServices{
    private  apiUrl = environment.apiUrl + '/NguoiDung';
    constructor(private httpClient:HttpClient) { 

    }
    getAll():Observable<User[]>{
        return this.httpClient.get<User[]>(this.apiUrl).pipe(
    )
  }
}
export class User{
    id!:number;
    name!:string;
    pass!: number;
    sdt!: number;
    diachi!: string;
    vaitro!: string;
}

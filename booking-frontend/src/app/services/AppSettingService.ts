import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class AppSettingService {
  private  apiUrl = environment.apiUrl + '/Settings';

  constructor(private http:HttpClient) {}
  
  GetByPrefix(prefix: string): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>(`${this.apiUrl}/${prefix}`);
    }
}

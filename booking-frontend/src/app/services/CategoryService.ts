import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class CategoryServer {
  private  apiUrl = environment.apiUrl + '/Category';

  constructor(private http:HttpClient) {}
  
  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { EventWithDetailDto } from '../models/EventDto';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private  apiUrl = environment.apiUrl + '/Category';

  constructor(private http:HttpClient) {}
  
  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
   getEventsByCategory(categoryId: number): Observable<EventWithDetailDto[]> {
    return this.http.get<EventWithDetailDto[]>(`${this.apiUrl}/byCategory/${categoryId}`);
  }

}

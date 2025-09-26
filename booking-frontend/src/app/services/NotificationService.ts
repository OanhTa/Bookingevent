import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  type: string; // General, Event, System
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apiUrl + '/Notification';

  constructor(private http: HttpClient) {}

  getMyNotifications(userId: string): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiUrl}/my?userId=${userId}`);
  }

  markAsRead(notificationId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/read/${notificationId}?userId=${userId}`, {});
  }

  createNotification(dto: { organisationId: string, title: string, message: string, type: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, dto);
  }
}

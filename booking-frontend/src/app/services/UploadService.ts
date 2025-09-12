import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'  
})
export class UploadServices {
  private apiUrl = environment.apiUrl + '/Upload';

  constructor(private httpClient: HttpClient) {}

  uploadAvatar(file: File, userId: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId); 

    return this.httpClient.post<{ success: boolean }>(`${this.apiUrl}/upload-avatar`, formData);
  }
}
